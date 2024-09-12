import http from "@/plugins/axios";

export class AuthServices {
  public static login(form: { email: string, password: string }) {
    return http.post('/auth/login/', form)
  }
}