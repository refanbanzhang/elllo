import { Topic, Landmark, mergeLists } from "./api"
import { describe, it, expect } from "vitest"

describe("mergeLists", () => {
  it("空数组测试", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = []

    const result = mergeLists(topics, landmarks)

    expect(result).toEqual([])
  })

  it("正常情况测试：1个专题后跟3个地标", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }, 
      { id: "l3", name: "地标3" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量小于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量大于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量为0测试", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    expect(result).toEqual(expected)
  })

  it("地标数量为0测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]
    const landmarks: Landmark[] = []

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量等于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "t2", name: "专题2" },
    ]

    expect(result).toEqual(expected)
  })

  it("正常情况测试：1个专题后跟4个地标", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "l4", name: "地标4" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "l4", name: "地标4" }
    ]

    expect(result).toEqual(expected)
  })

  it("地标数量不足测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "t2", name: "专题2" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量为0测试", () => {
    const topics: Topic[] = []

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    expect(result).toEqual(expected)
  })

  it("地标数量为0测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = []

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量大于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量小于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "t2", name: "专题2" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" }
    ]

    expect(result).toEqual(expected)
  })

  it("专题数量等于地标数量测试", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "t2", name: "专题2" }
    ]

    expect(result).toEqual(expected)
  })

  it("完全匹配测试 - 地标数等于专题数×3", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" },
      { id: "l6", name: "地标6" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "t2", name: "专题2" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" },
      { id: "l6", name: "地标6" }
    ]

    expect(result).toEqual(expected)
  })

  it("地标不足测试 - 地标数小于专题数×3", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "t2", name: "专题2" }
    ]

    expect(result).toEqual(expected)
  })

  it("地标富余测试 - 地标数大于专题数×3", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]

    const landmarks: Landmark[] = [
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" },
      { id: "l6", name: "地标6" },
      { id: "l7", name: "地标7" },
      { id: "l8", name: "地标8" }
    ]

    const result = mergeLists(topics, landmarks)

    const expected = [
      { id: "t1", name: "专题1" },
      { id: "l1", name: "地标1" },
      { id: "l2", name: "地标2" },
      { id: "l3", name: "地标3" },
      { id: "t2", name: "专题2" },
      { id: "l4", name: "地标4" },
      { id: "l5", name: "地标5" },
      { id: "l6", name: "地标6" },
      { id: "l7", name: "地标7" },
      { id: "l8", name: "地标8" }
    ]

    expect(result).toEqual(expected)
  })

  it("都为空测试", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = []

    const result = mergeLists(topics, landmarks)

    expect(result).toEqual([])
  })

  it("大数据量测试", () => {
    const topics: Topic[] = Array.from({ length: 10000 }, (_, i) => ({
      id: `t${i + 1}`,
      name: `专题${i + 1}`
    }))

    const landmarks: Landmark[] = Array.from({ length: 30000 }, (_, i) => ({
      id: `l${i + 1}`,
      name: `地标${i + 1}`
    }))

    const result = mergeLists(topics, landmarks)

    const expected: (Landmark | Topic)[] = []
    let topicIndex = 0
    let landmarkIndex = 0

    while (topicIndex < topics.length || landmarkIndex < landmarks.length) {
      if (topicIndex < topics.length) {
        expected.push(topics[topicIndex])
        topicIndex++
      }

      for (let i = 0; i < 3; i++) {
        if (landmarkIndex < landmarks.length) {
          expected.push(landmarks[landmarkIndex])
          landmarkIndex++
        }
      }
    }

    expect(result).toEqual(expected)
  })
})
