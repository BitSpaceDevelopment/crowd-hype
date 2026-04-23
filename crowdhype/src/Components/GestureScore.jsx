import { Text } from "@react-three/drei"

const GestureScore = ({scoreOpacity, accuracy, score, multiplier}) => {
  return (
    <>
      <Text
        position={[-5.8, 1.7, -6]}
        rotation={[0, 0.5, 0]} 
        fontSize={0.3}
        color={"#fff"}
        transparent={true}
        fillOpacity={scoreOpacity}
      >
        ACC {accuracy}%
      </Text>

      <Text
        position={[-6, 1.3, -6]}
        rotation={[0, 0.5, 0]} 
        fontSize={0.35}
        color={"#fff"}
        transparent={true}
        fillOpacity={scoreOpacity}
      >
        +{score}pts x{multiplier}!
      </Text>
    </>
  )
}

export default GestureScore;