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
}

export const mergeLists = <T, U>({
  primaryList,
  secondaryList,
  secondaryItemsPerPrimary,
}: MergeConfig<T, U>) => {
  const mergedList: (T | U)[] = []

  let primaryIndex = 0
  let secondaryIndex = 0

  const hasMorePrimary = () => primaryIndex < primaryList.length
  const hasMoreSecondary = () => secondaryIndex < secondaryList.length

  while (hasMorePrimary() || hasMoreSecondary()) {
    if (hasMorePrimary()) {
      mergedList.push(primaryList[primaryIndex])
      primaryIndex++
    }

    for (let i = 0; i < secondaryItemsPerPrimary; i++) {
      if (hasMoreSecondary()) {
        mergedList.push(secondaryList[secondaryIndex])
        secondaryIndex++
      }
    }
  }

  return mergedList
}

export default api