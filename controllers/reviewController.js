import Review from "../models/reviewModel.js"

 const createReview = async (req, res) => {
  try {

    const { eventId, rating, comment } = req.body

    const review = await Review.create({
      user: req.user._id,
      event: eventId,
      rating,
      comment
    })

    res.status(201).json({
      message: "Review added successfully",
      review
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


 const getEventReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      event: req.params.eventId
    }).populate("user", "name")

    res.json({
      total: reviews.length,
      reviews
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const reviewController = { createReview , getEventReviews}

export default reviewController