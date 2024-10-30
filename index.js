// Wrapping the whole extension in a JS function 
// (ensures all global variables set in this extension cannot be referenced outside its scope)
(async function(codioIDE, window) {
  
  // Refer to Anthropic's guide on system prompts here: https://docs.anthropic.com/claude/docs/system-prompts
  const systemPrompt = `You are a helpful assistant helping write educational content for novice learners. 
  You will be provided with instructions on what to draft a page of content on. Follow those instructions carefully.`
  
  // register(id: unique button id, name: name of button visible in Coach, function: function to call when button is clicked) 
  codioIDE.coachBot.register("generateContentTest", "Custom Content Draft Button", onButtonPress)

  // function called when I have a question button is pressed
  async function onButtonPress() {

    // Function that automatically collects all available context 
    // returns the following object: {guidesPage, assignmentData, files, error}
    const context = await codioIDE.coachBot.getContext()

    try {
        input = await codioIDE.coachBot.input("Please type or paste your instructions here!")
      }  catch (e) {
          if (e.message == "Cancelled") {
            codioIDE.coachBot.showMenu()
            return
          }
      }


    
    
    // the messages object that will contain the user prompt and/or any assistant responses to be sent to the LLM
    // Refer to Anthropic's guide on the messages API here: https://docs.anthropic.com/en/api/messages
    let messages = []

    const userPrompt = `Here are the teacher instructions for the page of content to generate. 

    <instructions>
    ${input}
    </instructions>

    Think step by step in a <scratchpad> about what would make a well-structured page of educational material based on the instructions provided.
    <scratchpad>
    Your analysis goes here
    </scratchpad>

    Based on your analysis, generate a page of content for novice learners.
    `

    // Add user prompt to messages object
    messages.push({
        "role": "user", 
        "content": userPrompt
    })

    // Send the API request to the LLM with all prompts and context 
    const result = await codioIDE.coachBot.ask({
      systemPrompt: systemPrompt,
      messages: messages
    })
    
  }
// calling the function immediately by passing the required variables
})(window.codioIDE, window)

 

  
  
