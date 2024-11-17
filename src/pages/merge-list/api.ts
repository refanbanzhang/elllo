import { mockRequest } from '@/api'

interface BaseItem {
  id: string;
  name: string;
}

export interface Landmark extends BaseItem {}

export interface Topic extends BaseItem {}

const MAX_LANDMARK_TOTAL = 11
const MAX_TOPIC_TOTAL = 15

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

// 合并专题和地标列表
export const mergeLists = (topics: Topic[], landmarks: Landmark[], itemsPerTopic = 3) => {
  const mergedList: (Landmark | Topic)[] = []

  // 记录当前处理到的索引位置
  let currentLandmarkIndex = 0
  let currentTopicIndex = 0

  // 一直到专题和地标数据都插入完毕后，才会结束循环
  // 默认情况下，请求的地标和专题数据是相匹配的，比如1个专题对应3个地标,2个专题对应6个地标
  // 1. 专题大于地标
  // 2. 专题小于地标
  // 2.1 专题匹配地标1:3 2:6
  // 2.2 专题不匹配地标1:2 2:3
  // 3. 专题等于地标

  while (currentTopicIndex < topics.length || currentLandmarkIndex < landmarks.length) {
    // 还有专题数据时，插入1个专题
    if (currentTopicIndex < topics.length) {
      mergedList.push(topics[currentTopicIndex])
      currentTopicIndex++
    }

    // 遍历3次，遍历时，有可能地标数据不足3条
    for (let i = 0; i < itemsPerTopic; i++) {
      // 还有地标数据时，插入1个地标
      if (currentLandmarkIndex < landmarks.length) {
        mergedList.push(landmarks[currentLandmarkIndex])
        currentLandmarkIndex++
      }
    }
  }

  return mergedList
}

export default api