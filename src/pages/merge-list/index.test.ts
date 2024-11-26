import { Topic, Landmark, mergeLists } from "./api"
import { describe, it, expect } from "vitest"

describe("mergeLists", () => {
  it("场景1: 地标为空", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]
    const landmarks: Landmark[] = []

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ])
  })

  it("场景2: 专题为空", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = [
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ]

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ])
  })

  it("场景3: 地标数量大于专题数", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]
    const landmarks: Landmark[] = [
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" },
      { id: "3", name: "地标3" },
      { id: "4", name: "地标4" },
      { id: "5", name: "地标5" }
    ]

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "t1", name: "专题1" },
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" },
      { id: "3", name: "地标3" },
      { id: "t2", name: "专题2" },
      { id: "4", name: "地标4" },
      { id: "5", name: "地标5" }
    ])
  })

  it("场景4: 地标数量小于专题数", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ]
    const landmarks: Landmark[] = [
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ]

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "t1", name: "专题1" },
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" },
      { id: "t2", name: "专题2" },
      { id: "t3", name: "专题3" }
    ])
  })

  it("场景5: 地标数量等于专题数", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]
    const landmarks: Landmark[] = [
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ]

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "t1", name: "专题1" },
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" },
      { id: "t2", name: "专题2" }
    ])
  })

  it("场景6: 空专题列表", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = [
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ]

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "1", name: "地标1" },
      { id: "2", name: "地标2" }
    ])
  })

  it("场景7: 空地标列表", () => {
    const topics: Topic[] = [
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ]
    const landmarks: Landmark[] = []

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([
      { id: "t1", name: "专题1" },
      { id: "t2", name: "专题2" }
    ])
  })

  it("场景8: 专题和地标都为空列表", () => {
    const topics: Topic[] = []
    const landmarks: Landmark[] = []

    const result = mergeLists({
      primaryList: topics,
      secondaryList: landmarks,
      secondaryItemsPerPrimary: 3,
      noMoreLandmark: true
    })

    expect(result).toEqual([])
  })
})
