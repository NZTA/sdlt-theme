// @flow

import {combineReducers} from "redux";
import type {
  QuestionnaireStartState,
  QuestionnaireState,
  QuestionnaireSubmissionState,
} from "../store/QuestionnaireState";
import type {LoadQuestionnaireStartAction} from "../actions/ActionType";
import ActionType from "../actions/ActionType";
import type {Question} from "../types/Questionnaire";
import _ from "lodash";

const defaultStartState: QuestionnaireStartState = {
  title: "",
  subtitle: "",
  keyInformation: "",
  questionnaireID: "",
  user: null
};

const defaultSubmissionState: QuestionnaireSubmissionState = {
  title: "",
  siteTitle: "",
  user: null,
  submission: null,
  isCurrentUserApprover: false,
  isCurrentUserABusinessOwnerApprover: false
};

export function startState(state: QuestionnaireStartState = defaultStartState, action: LoadQuestionnaireStartAction) {
  if (action.type === ActionType.QUESTIONNAIRE.LOAD_QUESTIONNAIRE_START_STATE) {
    return action.payload;
  }
  return state;
}

export function submissionState(state: QuestionnaireSubmissionState = defaultSubmissionState, action: *) {
  if (action.type === ActionType.QUESTIONNAIRE.LOAD_QUESTIONNAIRE_SUBMISSION_STATE_SUCCESS) {
    return action.payload;
  }

  if (action.type === ActionType.QUESTIONNAIRE.PUT_DATA_IN_QUESTIONNAIRE_ANSWER) {
    if (!state.submission) {
      return state;
    }

    // Find the matched question
    const answeredQuestion: Question = action.payload;
    const index = state.submission.questions.findIndex((question) => {
      return question.id === answeredQuestion.id;
    });
    if (index < 0) {
      return state;
    }

    const newState = {...state};
    _.set(newState, `submission.questions.${index}`, answeredQuestion);
    return newState;
  }

  if (action.type === ActionType.QUESTIONNAIRE.MOVE_TO_ANOTHER_QUESTIONNAIRE_QUESTION) {
    const submission = state.submission;
    if (!submission) {
      return state;
    }

    const {targetIndex} = {...action};
    const currentIndex = submission.questions.findIndex((question) => {
      return question.isCurrent;
    });

    // Don't move when target is wrong
    if (targetIndex < 0 || targetIndex >= submission.questions.length) {
      return state;
    }

    const newState = {...state};

    // Mark current question is not current anymore
    _.set(newState, `submission.questions.${currentIndex}.isCurrent`, false);

    // Mark target question to be current
    _.set(newState, `submission.questions.${targetIndex}.isCurrent`, true);

    return newState;
  }

  if (action.type === ActionType.QUESTIONNAIRE.MARK_QUESTIONNAIRE_QUESTION_NOT_APPLICABLE) {
    const submission = state.submission;
    if (!submission) {
      return state;
    }
    const newState = {...state};

    // Mark questions between target and current to be "not applicable"
    const nonApplicableIndexes = action.nonApplicableIndexes;
    if (nonApplicableIndexes && nonApplicableIndexes.length > 0) {
      nonApplicableIndexes.forEach(index => {
        const nonApplicableQuestion = submission.questions[index];
        nonApplicableQuestion.isApplicable = false;
        _.set(newState, `submission.questions.${index}`, nonApplicableQuestion);
      });
    }

    return newState;
  }

  return state;
}

export default combineReducers<QuestionnaireState>({
  startState,
  submissionState
});
