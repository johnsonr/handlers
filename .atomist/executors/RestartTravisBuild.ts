import {Executor} from "@atomist/rug/operations/Executor"
import {Services} from "@atomist/rug/model/Core"
import {Result, Status, Parameter} from "@atomist/rug/operations/RugOperation"

class RestartTravisBuild implements Executor {
    description: string = "Executor that starts a build on Travis"
    name: string = "RestartTravisBuild"
    parameters: Parameter[] = [{name: "build_id", description: "Build ID", pattern: "^.*$", maxLength: 100, required: true}
                               {name: "token_path", description: "Access Token Path", pattern: "^.*$", required: false,
                                tags: [{name: "token", description: "valid github token for authenticating with Travis"}]}]
    execute(services: Services, {build_id token_path} : {build_id: string, token_path: any}): Result {
        let _services: any = services
        _services.travis().restart(build_id, token_path)

        return new Result(Status.Success, "OK")
    }
}

var restartBuild = new RestartTravisBuild()
