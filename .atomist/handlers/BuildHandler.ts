import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/build[.status()='Failed']", m => {
   let build = m.root()
   let message = atomist.messageBuilder().regarding(build)
   let action = message.actionRegistry().findByName("RestartTravisBuild")
   let parameter: ParameterValue = {:name "build_id" :value build.id()}
   action.parameters.push(parameter)
   message.withAction(action)
   message.send()
})

atomist.on<TreeNode, TreeNode>("/commit", m => {
   let push = m.root()
   atomist.messageBuilder().regarding(push).send()
})
