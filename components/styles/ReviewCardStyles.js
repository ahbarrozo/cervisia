import styled from "styled-components";

const ReviewCardStyles = styled.div`
  background: var(--secondary, white);
  border: 1px solid $grey;
  border-bottom: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-left: 5px;

  :before {
    width: 5px;
    left: 0;
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    background-attachment: fixed;
  }

  .review__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
  }

  .review__header > * {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
  }

  .review__header > *:last-child {
    border-right: 0;
  }

  .review__author {
    justify-content: flex-start;
    padding-left: 2rem;
    display: flex;
  }

  .review__author .avatar {
    margin-right: 2rem;
  }

  .review__time {
    font-size: 1.2rem;
    color: var(--tertiary, grey);
  }

  .review__stars {
    color: var(--yellow, yellow);
  }

  .review__body {
    padding: 2rem;
  }

  p {
    white-space: pre-wrap;
  }
`;

export default ReviewCardStyles;
