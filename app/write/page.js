export default function Write() {
  return (
    <div className="p-20">
      <h4>글 작성 페이지입니다</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="제목"></input>
        <input name="content" placeholder="내용"></input>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
