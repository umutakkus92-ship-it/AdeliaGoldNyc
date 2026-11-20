import Link from "next/link";
import { SimplePage } from "@/components/views/SimplePage";

export default function NotFound() {
  return (
    <SimplePage title="Page not found">
      <p>The piece or page you were looking for isn’t here. It may have sold or moved.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Link className="btn" href="/shop">
          Shop all
        </Link>
        <Link className="btn line" href="/">
          Home
        </Link>
      </div>
    </SimplePage>
  );
}
