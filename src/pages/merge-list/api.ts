import { mockRequest } from '@/api'

interface BaseItem {
  id: string;
  name: string;
}

export interface Landmark extends BaseItem { }

export interface Topic extends BaseItem { }

const MAX_TOPIC_TOTAL = 100 
const MAX_LANDMARK_TOTAL = 100

// 模拟分页接口返回数据
const getMockLandmarkData = (page: number, size: number, maxTotal = MAX_LANDMARK_TOTAL) => {
  const start = (page - 1) * size;
  const data: Landmark[] = [];

  // 如果起始位置已经超过最大数据量,返回空数组
  if (start >= maxTotal) {
    return data;
  }

  // 计算本次应该返回的数据量
  const currentSize = Math.min(size, maxTotal - start);

  for (let i = 0; i < currentSize; i++) {
    const id = String(start + i + 1);
    data.push({
      id,
      name: `地标${id}`
    });
  }

  return data;
};

const getMockTopicData = (page: number, size: number, maxTotal = MAX_TOPIC_TOTAL) => {
  const start = (page - 1) * size;
  const data: Topic[] = [];

  // 如果起始位置已经超过最大数据量,返回空数组
  if (start >= maxTotal) {
    return data;
  }

  // 计算本次应该返回的数据量
  const currentSize = Math.min(size, maxTotal - start);

  for (let i = 0; i < currentSize; i++) {
    const id = `t${start + i + 1}`;
    data.push({
      id,
      name: `专题${start + i + 1}`
    });
  }

  return data;
};

const api = {
  getLandmarkList: (page: number, size: number): Promise<Landmark[]> =>
    mockRequest(getMockLandmarkData(page, size), 10),
  getTopicList: (page: number, size: number): Promise<Topic[]> =>
    mockRequest(getMockTopicData(page, size), 10)
}

interface MergeConfig<T, U> {
  primaryList: T[]
  secondaryList: U[]
  secondaryItemsPerPrimary: number
  noMoreLandmark: boolean
}

/**
 * 合并两个列表，按照指定比例交错插入
 * @param {object} params - 合并参数
 * @param {any[]} params.primaryList - 主列表(专题)
 * @param {any[]} params.secondaryList - 次列表(地标)
 * @param {number} params.secondaryItemsPerPrimary - 每个主列表项对应的次列表项数量
 * @returns {any[]} 合并后的列表
 */
export const mergeLists = ({
  primaryList,
  secondaryList,
  secondaryItemsPerPrimary,
  noMoreLandmark,
}: MergeConfig<Topic, Landmark>) => {
  const mergedList = []

  let primaryIndex = 0
  let secondaryIndex = 0
  let secondaryCount = 0

  const hasMorePrimary = () => primaryIndex < primaryList.length
  const hasMoreSecondary = () => secondaryIndex < secondaryList.length

  // 首先插入第一个专题
  if (hasMorePrimary()) {
    mergedList.push(primaryList[primaryIndex])
    primaryIndex++
  }

  // 优先遍历地标列表
  while (hasMoreSecondary()) {
    mergedList.push(secondaryList[secondaryIndex])
    secondaryIndex++
    secondaryCount++

    // 每当累计了指定数量的地标后，插入一个专题
    if (secondaryCount === secondaryItemsPerPrimary && hasMorePrimary()) {
      mergedList.push(primaryList[primaryIndex])
      primaryIndex++
      secondaryCount = 0
    }
  }

  // 如果地标遍历完了且标记为没有更多地标，则插入剩余的所有专题
  if (noMoreLandmark) {
    mergedList.push(...primaryList.slice(primaryIndex))
  }

  return mergedList
}

export default api