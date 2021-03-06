import {Atomist} from '@atomist/rug/operations/Handler'
import {TreeNode} from '@atomist/rug/tree/PathExpression'
declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/issue[.state()='open']", m => {
   let issue = m.root() as any
   let message = atomist.messageBuilder().regarding(issue)

   let assign = message.actionRegistry().findByName("AssignIssue")
   assign = message.actionRegistry().bindParameter(assign, "number", issue.number())
   message.withAction(assign)

   let label = message.actionRegistry().findByName("LabelIssue")
   label = message.actionRegistry().bindParameter(label, "number", issue.number())
   message.withAction(label)

   let close = message.actionRegistry().findByName("CloseIssue")
   close = message.actionRegistry().bindParameter(close, "number", issue.number())
   message.withAction(close)

   let comment = message.actionRegistry().findByName("CommentIssue")
   comment = message.actionRegistry().bindParameter(comment, "number", issue.number())
   message.withAction(comment)

   message.send()
})

atomist.on<TreeNode, TreeNode>("/issue[.state()='closed']", m => {
   let issue = m.root() as any
   let message = atomist.messageBuilder().regarding(issue)

   let reopen = message.actionRegistry().findByName("ReopenIssue")
   reopen = message.actionRegistry().bindParameter(reopen, "number", issue.number())
   message.withAction(reopen)

   message.send()
})
