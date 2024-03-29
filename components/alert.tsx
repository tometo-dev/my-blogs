import Container from "./container"
import cn from "classnames"
import { GITHUB_REPO } from "../lib/constants"

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        {preview ? (
          <div className="py-2 text-center text-sm">
            This page is a preview.{" "}
            <a
              href="/api/exit-preview"
              className="underline hover:text-cyan duration-200 transition-colors"
            >
              Click here
            </a>{" "}
            to exit preview mode.
          </div>
        ) : null}
      </Container>
    </div>
  )
}

export default Alert
