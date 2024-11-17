import { mockRequest } from '@/api'

export interface Landmark {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
}

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

const ITEMS_PER_TOPIC = 3
export const mergeLists = (topics: Topic[], landmarks: Landmark[]) => {
  const tempList: (Landmark | Topic)[] = []

  // 记录当前处理到的索引位置
  let currentLandmarkIndex = 0
  let currentTopicIndex = 0

  while (currentTopicIndex < topics.length || currentLandmarkIndex < landmarks.length) {
    // 插入1个专题
    if (currentTopicIndex < topics.length) {
      tempList.push(topics[currentTopicIndex])
      currentTopicIndex++
    }

    // 插入3个地标
    for (let i = 0; i < ITEMS_PER_TOPIC; i++) {
      if (currentLandmarkIndex < landmarks.length) {
        tempList.push(landmarks[currentLandmarkIndex])
        currentLandmarkIndex++
      }
    }
  }

  return tempList
}

export default api