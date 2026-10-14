import { randomUUID } from 'node:crypto';
import { seedKnowledgeBaseData } from './seedData.js';

const collections = Object.fromEntries(
  Object.entries(seedKnowledgeBaseData).map(([name, records]) => [
    name,
    records.map(record => ({ ...record, _id: randomUUID() }))
  ])
);

export const getMemoryCollection = (name) => collections[name] || [];

export const addMemoryRecord = (name, record) => {
  const collection = getMemoryCollection(name);
  const saved = { ...record, _id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };
  collection.unshift(saved);
  return saved;
};

export const removeMemoryRecord = (name, id) => {
  const collection = getMemoryCollection(name);
  const index = collection.findIndex(record => String(record._id) === String(id));
  if (index === -1) return false;
  collection.splice(index, 1);
  return true;
};

export const updateMemoryRecord = (name, id, updates) => {
  const record = getMemoryCollection(name).find(item => String(item._id) === String(id));
  if (!record) return null;
  Object.assign(record, updates, { updatedAt: new Date() });
  return record;
};

export const memoryChatLogs = [];
export const memoryFeedback = [];
