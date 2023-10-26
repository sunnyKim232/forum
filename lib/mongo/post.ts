import { connectDB } from "../../util/database";
import { Collection, Document } from "mongodb";

let post: Collection<Document>;

async function init() {
  const db = (await connectDB).db("forum");
  post = db.collection("post");
}

(async () => {
  await init();
})();

export const getPost = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    if (!post) await init();

    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await post.aggregate(pipeline).toArray();

    await new Promise((resolve) => setTimeout(resolve, 750));

    return { post: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error };
  }
};

type PipelineStage =
  | {
      $search: {
        index: string;
        text: {
          query: string;
          fuzzy: {};
          path: {
            wildcard: string;
          };
        };
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    }
  | {
      $sort: {
        [fieldName: string]: 1 | -1; // 1 for ascending, -1 for descending
      };
    };
