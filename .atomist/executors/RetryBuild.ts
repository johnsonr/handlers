import {Executor} from "user-model/operations/Executor"
import {Services} from "user-model/model/Core"
import {Result,Status} from "user-model/operations/RugOperation"

class RetryBuild implements Executor {

  description: string = "Retry a Travis Build"
  name: string = "RetryBuild"
  parameters: Parameter[] = [{name: "build_id", description: "id of existing build", displayName: "build identifier", pattern: ".*"}]
  execute(services: Services, {build_id}: {build_id: string}): Result {

    // build_id is essentially pass by reference semantics for grabbing the appropriate Build node
    let path_engine: PathExpressionEngine = services.pathExpressionEngine()
    path_engine.findById<Build>( build_id, build => {

      // note that we're not using the existing Travis type which is for managing .travis.yml files
      //   in this executor, we use behavior on the Travis Build type from our model
      if (build.rebuild()) {
        return new Result(Status.Success, "OK")
      } else {
        return new Result(Status.Failed, "travis rebuild failed"
      }
    }
  }
}
