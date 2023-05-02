export default function Join() {
  return (
    <div className="p-20">
      <h4>회원가입 페이지</h4>
      <form action="/api/join/new" method="POST">
        <input name="userid" placeholder="아이디"></input>
        <input name="userpw" placeholder="패스워드"></input>
        <button type="submit">가입</button>
      </form>
    </div>
  );
}
