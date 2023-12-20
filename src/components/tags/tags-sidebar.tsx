import { Link } from "react-router-dom";
import { getTags } from "../../services/article-service";
import { useEffect, useState } from "react";

export default function TagSidebar() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    });
  }, []);

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((tag) => (
            <Link
              className="tag-pill tag-default"
              style={{ cursor: "pointer" }}
              key={tag}
              to={`/?filter=${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
