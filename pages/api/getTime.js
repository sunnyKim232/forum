export default async function handler(request, response) {
  if (request.method === "GET") {
    return response.status(200).json(new Date().toString());
  }
}
