import { userService } from '../services/user'

import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    async function shouldShowActionBtns(review) {
        const user = await userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return review.byUser?._id === user._id
    }

    return (
        <section>
            <ul className="review-list clean-list">
                {reviews.map(review => (
                    <li key={review._id} className="flex flex-column">
                        <ReviewPreview review={review} />
                        {shouldShowActionBtns(review) && (
                            <button
                                className="btn"
                                onClick={() => onRemoveReview(review._id)}
                            >
                                x
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
