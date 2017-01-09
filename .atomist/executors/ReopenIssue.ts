import {Executor} from "@atomist/rug/operations/Executor"
import {Services} from "@atomist/rug/model/Core"
import {Result, Status, Parameter} from "@atomist/rug/operations/RugOperation"

import {GitHubService} from "@atomist/github/core/Core"

interface Parameters {
    number: number
    owner: string
    repo: string
    token: string
}

var reopenIssue: Executor = {
    description: "Close a GitHub issue",
    name: "ReopenIssue",
    parameters: [
        // TODO proper patterns and validation
        { name: "number", description: "Issue Number", pattern: "^.*$", maxLength: 100, required: true},
        { name: "owner", description: "GitHub Owner", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/owner"]},
        { name: "repo", description: "GitHub Repo", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/repository"]},
        { name: "token", description: "GitHub Token", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/user_token"]}
    ],
    execute(services: Services, p: Parameters): Result {

        let _services: any = services
        let githubService = _services.github() as GitHubService
        let status = githubService.reopenIssue(p.number, p.owner, p.repo, p.token)
        _services.messageBuilder().say(status.message()).send()
        if (status.success()) {
            return new Result(Status.Success, "OK")
        }
        else {
          return new Result(Status.Error, status.message())
        }
    }
}
