import axios from 'axios';
import _ from 'lodash';

const http = axios.create({
  baseURL: 'http://localhost:8080/'});

export interface UserInterface {
  user_id: number;
  name: string;
  email: string;
  address: string;
  reg_date: string;
  password: string;
  upload_photo: string;
}

export interface AdminInterface {
  admin_id: number;
  name: string;
  email: string;
  password: string;
}

export interface ContactInterface {
  user_id: number;
  name: string;
  email: string;
  address: string;
  reg_date: string;
  password: string;
  upload_photo: string;
}

export interface CourseInterface {
  user_id: number;
  name: string;
  email: string;
  address: string;
  reg_date: string;
  password: string;
  upload_photo: string;
}

export interface FeedbackInterface {
  user_id: number;
  name: string;
  email: string;
  address: string;
  reg_date: string;
  password: string;
  upload_photo: string;
}

type TableInterfaces = UserInterface | AdminInterface | ContactInterface | CourseInterface | FeedbackInterface;

type ArrayResponse = any[];

class fetchApi {
  table: string;

  constructor(table: string) {
    this.table = table;
  }

  async getAll(): Promise<ArrayResponse> {
    return _.get(await http.get(`${this.table}`), "data");
  }

  async getById(id: number): Promise<TableInterfaces> {
    return _.get(await http.get(`${this.table}/${id}`), "data");
  }

  async add(data: Response):Promise<boolean> {
    const req = _.get(await http.post(`${this.table}`, data), "status");
    return req === 201;
  }

  async edit(id: number, data: TableInterfaces):Promise<boolean> {
    const req = _.get(await http.put(`${this.table}`, data), "status");
    return req === 200;
  }

  async delete(id: number):Promise<boolean> {
    const req = _.get(await http.delete(`${this.table}/${id}`), "status");
    return req === 204;
  }
}

export default fetchApi;