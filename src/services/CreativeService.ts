import axios from "axios";
import CreativeT from "../types/CreativeT";

// export const CREATIVE_BASE_URL = "http://localhost:3001";
export const CREATIVE_BASE_URL = "https://adsmanager-mk.herokuapp.com";

const apiClient = axios.create({
  baseURL: CREATIVE_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const findAll = async () => {
  const response = await apiClient.get<CreativeT[]>(`/creatives`);
  response.data.pop();
  return response.data;
};
const findAllWithPagination = async (pageNumber:number) => {
  const response = await apiClient.get<CreativeT[]>(`/creatives?_page=${pageNumber}&_limit=100`);
  response.data.pop();
  return response.data;
};
const findById = async (id: any) => {
  const response = await apiClient.get<CreativeT[]>(`/creatives/${id}`);
  return response.data;
};
const findByTitle = async (title: string) => {
  const response = await apiClient.get<CreativeT[]>(
    `/creatives?title=${title}` 
  );
  return response.data;
};
const create = async ({ title, description, content, enabled }: CreativeT) => {
  const response = await apiClient.post<any>("/creatives", {
    title,
    description,
    content,
    enabled,
  });
  return response.data;
};
const update = async ({ id, ...data }: CreativeT) => {
  const response = await apiClient.put<any>(`/creatives/${id}`, {
    id,
    ...data,
  });
  return response.data;
};
const deleteById = async (id: any) => {
  const response = await apiClient.delete<any>(`/creatives/${id}`);
  return response.data;
};
const deleteAll = async () => {
  const response = await apiClient.delete<any>("/creatives");
  return response.data;
};
const CreativeService = {
  findAll,
  findAllWithPagination,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll,
};
export default CreativeService;
