import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";

const PostTable = ({ header, list }) => {
  return (
    <div className="table-border">
      <div>
        <h3>{header}</h3>
      </div>
      <div>
        {list.map((item) => (
          <Link
            href={`/detail/${item._id.toString()}`}
            style={{ textDecoration: "none" }}
          >
            <p>
              {item.title}
              {item.like ? (
                <>
                  <AiFillHeart />
                  {item.like}
                </>
              ) : (
                "(" + item.count + ")"
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostTable;
