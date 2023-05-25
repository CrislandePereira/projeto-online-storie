export function addFeedback(feedback, productId) {
  const feedbacks = JSON.parse(localStorage.getItem(productId)) || [];
  feedbacks.push(feedback);
  localStorage.setItem(productId, JSON.stringify(feedbacks));
}

export function getFeedbacksByProductId(productId) {
  return JSON.parse(localStorage.getItem(productId)) || [];
}
