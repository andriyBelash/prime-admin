import http from "@/plugins/axios";

export class UserServices {
  public static getAll(params: Record<string, any>) {
    return http.get('/users', { params })
  }

  public static create(form: FormData) {
    return http.post('/users', form, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  public static remove(id: number) {
    return http.delete(`/users/${id}`)
  }
}