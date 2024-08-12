import request from "supertest";
import App from "../src/app";

const app = new App().app;
describe("GET main route API", () => {
  // test code
  beforeEach(() => {
    // digunakan untuk menyiapkan program yang ingin dijalankan terlebih dahulu
    // sebelum menjalankan tiap poin testing
  });

  beforeAll(() => {
    // digunakan untuk menyiapkan program yang dijalankan sekali sebelum semua proses testing berlangsung
    // contoh : menjalankan fungsi untuk cek koneksi ke database
  });

  afterEach(() => {
    // digunakan untuk menyiapkan program yang ingin dijalnkan setelah tiap poin testing dieksekusi
    // contoh : hapus data testing
  });

  afterAll(() => {
    // digunakan untuk menyiapkan program yang sekali dijalankan setelah semua tahap testing selesai
    // contoh : disconnect dari database, reset data
  });

  // TEST access ROUTE
  //   GOOD CASE
  it("Call main route", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });

  //   BAD CASE
  it("SHould return NOT FOUND PAGE", async () => {
    const response = await request(app).get("/api/blog");
    expect(response.status).toBe(404);
  });
});
