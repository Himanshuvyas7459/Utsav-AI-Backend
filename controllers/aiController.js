 // Temporary Replace Of API Like Gemini/openAi
 const generateEventPlan = async (req, res) => {
  try {

    const { eventType, budget, guests } = req.body

    let plan = {}

    if (eventType === "Wedding") {

      plan = {
        decoration: "Royal floral theme with stage lighting",
        food: "Indian buffet with 15+ dishes",
        entertainment: "Live band + DJ night",
        checklist: [
          "Book wedding venue",
          "Hire photographer",
          "Arrange catering",
          "Send invitations"
        ],
        estimatedBudget: budget
      }

    }

    else if (eventType === "Birthday") {

      plan = {
        decoration: "Balloon theme with LED lights",
        food: "Snacks + cake + drinks",
        entertainment: "Music + games",
        checklist: [
          "Order birthday cake",
          "Invite friends",
          "Decorate hall",
          "Arrange music system"
        ],
        estimatedBudget: budget
      }

    }

    else if (eventType === "Corporate") {

      plan = {
        decoration: "Minimal professional stage setup",
        food: "Buffet + coffee station",
        entertainment: "Guest speaker + networking",
        checklist: [
          "Book conference hall",
          "Arrange projector",
          "Invite speakers",
          "Prepare presentation"
        ],
        estimatedBudget: budget
      }

    }
    // console.log("REQ BODY:", req.body)

    res.json({
      success: true,
      eventType,
      guests,
      plan
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}
 const aiController = {generateEventPlan}

export default aiController








// For Gemini API
// import { GoogleGenerativeAI } from "@google/generative-ai"

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// const generateEventPlan = async (req, res) => {
//   try {

//     const { eventType, budget, location } = req.body

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash-latest"
//     })

//     const prompt = `
//     Create an event plan.
//     Event Type: ${eventType}
//     Budget: ${budget}
//     Location: ${location}

//     Suggest:
//     - Decoration
//     - Food
//     - Entertainment
//     `

//     const result = await model.generateContent(prompt)

//     const response = result.response.text()

//     res.json({
//       success: true,
//       plan: response
//     })

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     })
//   }
// }

//  const aiController = {generateEventPlan , genAI}

// export default aiController






// For OpenAi API

// import OpenAI from "openai"

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })

// const generateEventPlan = async (req,res)=>{
//     try{

//         const {eventType,guests,budget} = req.body

//         const prompt = `
//         Create an event plan for ${eventType}.
//         Number of guests: ${guests}.
//         Budget: ${budget} INR.

//         Provide:
//         1. Event Schedule
//         2. Budget Breakdown
//         3. Event Checklist
//         `

//         const completion = await openai.chat.completions.create({
//             model: "gpt-4.1-mini",
//             messages:[
//                 {role:"user",content:prompt}
//             ]
//         })

//         res.json({
//             plan:completion.choices[0].message.content
//         })

//     }catch(error){
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// const aiController = {generateEventPlan , openai}

// export default aiController