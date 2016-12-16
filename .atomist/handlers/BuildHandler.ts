declare var atomist

atomist.on("/build[.state()='Failed']/commit/on/repo/org[.owner()='atomisthqa']", m => {

   let build = m.root()

   var message = atomist.messageBuilder().regarding(build)
   var action = message.actionRegistry.findByName("RetryBuild").addParam("build_id", build.id)

   message.addAction(retry).send()
   
})
