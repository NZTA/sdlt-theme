// @flow

import React, {Component} from "react";
import Questionnaire from "../Questionnaire/Questionnaire";
import AnswersPreview from "../Questionnaire/AnswersPreview";
import type {TaskSubmission as TaskSubmissionType} from "../../types/Task";
import type {Question} from "../../types/Questionnaire";
import editIcon from "../../../img/icons/edit.svg";
import LightButton from "../Button/LightButton";
import URLUtil from "../../utils/URLUtil";
import DarkButton from "../Button/DarkButton";
import pdfIcon from "../../../img/icons/pdf.svg";
import PDFUtil from "../../utils/PDFUtil";
import RiskResultContainer from "../Common/RiskResultContainer";
import SecurityRiskAssessmentUtil from "../../utils/SecurityRiskAssessmentUtil";
import {SubmissionExpired} from "../Common/SubmissionExpired";

type Props = {
  taskSubmission: TaskSubmissionType,
  saveAnsweredQuestion: (answeredQuestion: Question) => void,
  moveToPreviousQuestion: (targetQuestion: Question) => void,
  handleApproveButtonClick: () => void,
  handleDenyButtonClick: () => void,
  showBackButton: boolean,
  showEditButton: boolean,
  canUpdateAnswers: boolean,
  secureToken: string
};

class TaskSubmission extends Component<Props> {
  render() {
    const {
      taskSubmission,
      saveAnsweredQuestion,
      moveToPreviousQuestion,
      handleApproveButtonClick,
      handleDenyButtonClick,
      editAnswers,
      showBackButton,
      showEditButton,
      canUpdateAnswers,
      viewAs,
      secureToken
    } = {...this.props};

    let body = (
      <AnswersPreview questions={taskSubmission.questions}/>
    );

    if (canUpdateAnswers) {
      body = (
        <Questionnaire
          questions={taskSubmission.questions}
          saveAnsweredQuestion={saveAnsweredQuestion}
          onLeftBarItemClick={moveToPreviousQuestion}
        />
      );
    }

    const backButton = showBackButton ? (
      <DarkButton
        title={"BACK TO QUESTIONNAIRE SUMMARY"}
        onClick={() => {
          URLUtil.redirectToQuestionnaireSummary(taskSubmission.questionnaireSubmissionUUID, secureToken);
        }}
      />
    ) : null;

    const isSRATaskFinalised = taskSubmission.taskType === 'risk questionnaire' && SecurityRiskAssessmentUtil.isSRATaskFinalised(taskSubmission.siblingSubmissions);

    const editButton = showEditButton && !isSRATaskFinalised ? (
      <LightButton
        title="EDIT ANSWERS"
        onClick={editAnswers}
        iconImage={editIcon}
      />
    ) : null;

    const resultStatus = ["complete", "waiting_for_approval", "approved", "denied"];
    const pdfButton = (resultStatus.indexOf(taskSubmission.status) > -1) ? (
      <LightButton title={"DOWNLOAD PDF"} iconImage={pdfIcon} onClick={() => this.downloadPdf()}/>
    ) : null;

    const result = taskSubmission.result && (resultStatus.indexOf(taskSubmission.status) > -1) ? (
      <div className="result">
        <h3>Result:</h3>
        <div>{taskSubmission.result}</div>
      </div>
    ) : null;

    const riskResult = taskSubmission.riskResults && (resultStatus.indexOf(taskSubmission.status) > -1) ? (
      <RiskResultContainer
        riskResults={taskSubmission.riskResults}
        hideWeightsAndScore={taskSubmission.hideWeightsAndScore}
      />
    ) : null;

    const approveButton = (viewAs === "approver" && taskSubmission.status === "waiting_for_approval") ? (
      <DarkButton title={"APPROVE"} onClick={handleApproveButtonClick} classes={["button"]}/>
    ) : null;

    const denyButton = (viewAs === "approver" && taskSubmission.status === "waiting_for_approval") ? (
      <LightButton title={"DENY"} onClick={handleDenyButtonClick} classes={["button"]}/>
    ) : null;

    return (
      <div className="TaskSubmission">
        {taskSubmission.status === 'expired' && <SubmissionExpired/>}
        {
          taskSubmission.status !== 'expired' && (
            <div>
              {
                taskSubmission.taskType === 'risk questionnaire' &&
                isSRATaskFinalised ? SecurityRiskAssessmentUtil.getSraIsFinalisedAlert() : false
              }
              {result}
              {body}
              {riskResult}

                  <div className="buttons">
                  {editButton}
                  {pdfButton}
                  {backButton}
                  <div>
                    {approveButton}
                    {denyButton}
                  </div>
                </div>
            </div>
          )
        }
      </div>
    );
  }


  downloadPdf() {
    const {
      taskSubmission,
      currentUser,
      siteConfig
    } = {...this.props};

    if (!taskSubmission && !siteConfig && !currentUser) {
      return;
    }

    PDFUtil.generatePDF({
      questions: taskSubmission.questions,
      submitter: taskSubmission.submitter.email ? taskSubmission.submitter : currentUser,
      questionnaireTitle: taskSubmission.taskName,
      siteConfig: siteConfig,
      result: taskSubmission.result,
      riskResults: taskSubmission.riskResults,
    });
  }
}

export default TaskSubmission;
