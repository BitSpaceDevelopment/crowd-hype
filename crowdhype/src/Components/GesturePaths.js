import * as THREE from "three";

export const calculateAccuracy = (userPath, actualPath, setAccuracy, setScore) => {
  const accuracyStart = 100;

  if (userPath.length === 0 || actualPath.length === 0) return 0;

  const actualPathLength = actualPath.length;
  const filteredUserPath = userPath.filter((p) => p instanceof THREE.Vector3);
  const filteredActualPath = actualPath.filter((p) => p instanceof THREE.Vector3);

  const normalizedUserPath = normalizePath(filteredUserPath, actualPathLength);
  const normalizedActualPath = normalizePath(filteredActualPath, actualPathLength);

  let totalDistance = 0;
  for (let i = 0; i < normalizedUserPath.length; i++) {
    const userPoint = normalizedUserPath[i];
    const actualPoint = normalizedActualPath[i];
    totalDistance += userPoint.distanceTo(actualPoint);
  }

  const accuracy = Math.max((accuracyStart - totalDistance), 0);
  const roundedAccuracy = Math.floor(accuracy);

  setAccuracy(roundedAccuracy);
  setScore(roundedAccuracy * 10);
}

export const normalizePath = (path, targetLength) => {
  const normalizedPath = [];
  const pathLength = path.length;

  for (let i = 0; i < targetLength; i++) {
    const t = i / (targetLength - 1);
    const index = t * (pathLength - 1);

    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const lerpFactor = index - lowerIndex;

    if (upperIndex < pathLength) {
      const lowerPoint = path[lowerIndex];
      const upperPoint = path[upperIndex];

      const interpolatedPoint = new THREE.Vector3()
        .copy(lowerPoint)
        .lerp(upperPoint, lerpFactor);

      normalizedPath.push(interpolatedPoint);
    } else {
      normalizedPath.push(path[lowerIndex]);
    }
  }

  return normalizedPath;
}

export const getPath = (radius, arc, numPoints, position, rotation) => {
  const points = [];
  const quaternion = new THREE.Quaternion().setFromEuler(rotation);
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / (numPoints - 1)) * arc;
    
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    const pathPoint = new THREE.Vector3(x, y, 0);
    pathPoint.applyQuaternion(quaternion);
    pathPoint.add(position)

    points.push(pathPoint);
  }
  
  return points;
}

export const setPathAndPosition = (
  currentController, 
  setUserPath, 
  distanceUserPath
) => {
  const zPosition = -4.5;
  const { controller } = currentController.current;
  const controllerPosition = controller.position;
  const controllerQuaternion = controller.quaternion;

  const rayDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(controllerQuaternion);
  const rayOrigin = new THREE.Vector3().copy(controllerPosition);

  const t = (zPosition - rayOrigin.z) / rayDirection.z;
  const intersection = rayOrigin.clone().add(rayDirection.multiplyScalar(t));

  const newPointingPosition = new THREE.Vector3(intersection.x, intersection.y, zPosition);

  setUserPath((prev) => {
    const lastPoint = prev[prev.length - 1];
    if (!lastPoint || lastPoint.distanceTo(newPointingPosition) > distanceUserPath) {
      return [...prev, newPointingPosition];
    }
    return prev;
  });
};

