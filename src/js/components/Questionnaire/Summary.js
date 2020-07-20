// @flow

import React, {Component} from "react";
import {Link} from "react-router-dom";
import type {Submission} from "../../types/Questionnaire";
import LightButton from "../Button/LightButton";
import DarkButton from "../Button/DarkButton";
import pdfIcon from "../../../img/icons/pdf.svg";
import editIcon from "../../../img/icons/edit.svg";
import _ from "lodash";
import URLUtil from "../../utils/URLUtil";
import SubmissionDataUtil from "../../utils/SubmissionDataUtil";
import type {User} from "../../types/User";
import RiskResultContainer from "../Common/RiskResultContainer";
import {
  DEFAULT_SRA_UNFINISHED_TASKS_MESSAGE
} from "../../constants/values";
import SecurityRiskAssessmentUtil from "../../utils/SecurityRiskAssessmentUtil";
import {SubmissionExpired} from "../Common/SubmissionExpired";

type Props = {
  submission: Submission | null,
  handlePDFDownloadButtonClick: () => void,
  handleSubmitButtonClick: () => void,
  handleAssignToMeButtonClick: () => void,
  handleApproveButtonClick: (skipBoAndCisoApproval: boolean) => void,
  handleDenyButtonClick: (skipBoAndCisoApproval: boolean) => void,
  handleEditButtonClick: () => void,
  viewAs: "submitter" | "approver" | "others",
  token: string,
  user: User | null
};

const prettifyStatus = (status: string) => {
  if (!status) {
    return;
  }
  return status
    .split("_")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};

class Summary extends Component<Props> {

  static defaultProps = {
    submission: null,
    handlePDFDownloadButtonClick: () => {},
    handleSubmitButtonClick: () => {},
    handleApproveButtonClick: () => {},
    handleDenyButtonClick: () => {},
    handleEditButtonClick: () => {},
    handleAssignToMeButtonClick: () => {},
    viewAs: "others",
    token: "",
    user: null
  };

  constructor(props) {
    super(props);
    this.state = {
      skipBoAndCisoApproval: false
    };
  }

  unfinishedTaskSubmissionMessage()
  {
    const taskSubmissions = this.props.submission.taskSubmissions;
    let unfinishedMessage = '';

    const filteredTask = taskSubmissions.filter((taskSubmission)=> {
      return taskSubmission.taskType === 'risk questionnaire'
    });

    if (filteredTask.length > 0) {
      const riskQuestionnaireTask = filteredTask[0];
      const isRQCompleted = (riskQuestionnaireTask.status === 'complete' || riskQuestionnaireTask.status == "approved");
      if(riskQuestionnaireTask && !isRQCompleted) {
        unfinishedMessage = `Please complete "${riskQuestionnaireTask.taskName}" to see the Security Risk Assessment`;
      }
    }

    return unfinishedMessage;
  }

  hasSelectableComponents(sub)
  {
    let taskSubmissions = sub.taskSubmissions,
      hasSelectableComponents = false;

    taskSubmissions.forEach((submission, index) => {
      let isComponentSelection = (submission.taskType === 'selection');
      if(isComponentSelection) {
        hasSelectableComponents = true;
      }
    });

    return hasSelectableComponents;
  }

  render() {
    const {submission, viewAs, user} = {...this.props};
    if (!submission) {
      return null;
    }

    if (submission.status === "in_progress" && viewAs === "submitter") {
      return (
        <div className="Summary">
          <h3>
            Questionnaire Submission has not been completed...
          </h3>
        </div>
      );
    }

    if (submission.status === "expired") {
      return (
        <SubmissionExpired/>
      );
    }

    return (
      <div className="Summary">
        {this.renderSubmitterInfo(submission)}
        {this.renderTasks(submission)}
        {this.renderApprovals(submission)}
        <RiskResultContainer
          riskResults={submission.riskResults}
          hideWeightsAndScore={submission.hideWeightsAndScore}
        />
        {this.renderSkipCheckbox(submission, viewAs, user)}
        {this.renderButtons(submission)}
      </div>
    );
  }

  renderSubmitterInfo(submission: Submission) {
    const submitter = submission.submitter;

    return (
      <div className="request-info">
        <h3>Request Information</h3>
        <div><b>Product Name:</b> {submission.productName} </div>
        <div><b>Submitted by:</b> {submitter.name}</div>
        <div><b>Email:</b> {submitter.email}</div>
        <div><b>Status:</b> {prettifyStatus(submission.status)}</div>
      </div>
    );
  }

  renderTasks(submission: Submission) {
    const taskSubmissions = submission.taskSubmissions;
    const isSRATaskFinalised = SecurityRiskAssessmentUtil.isSRATaskFinalised(submission.taskSubmissions);

    if (taskSubmissions.length === 0) {
      return null;
    }

    const unfinshedRQTaskMessage = this.unfinishedTaskSubmissionMessage() ? (
      <div className="alert alert-warning">{this.unfinishedTaskSubmissionMessage()}</div>
    ) : null;

    return (
      <div className="tasks">
        <h3>Tasks</h3>
        {unfinshedRQTaskMessage}
        {isSRATaskFinalised ? SecurityRiskAssessmentUtil.getSraIsFinalisedAlert() : null}

        {taskSubmissions.map(({uuid, taskName, taskType, status, approver}) => {
          let taskNameAndStatus = taskName + ' (' + prettifyStatus(status) + ')';

          if (status === "start") {
            taskNameAndStatus = taskName + ' (Please complete me)';
          }

          if ((status === "approved" || status === "denied") && approver.name) {
            taskNameAndStatus = taskName + ' (' + prettifyStatus(status) + ' by ' + approver.name + ')';
          }

          const {token} = {...this.props};

          let taskRedirectURL = URLUtil.redirectToTaskSubmission(uuid, token, "urlString");

          if (taskType === "selection") {
            taskRedirectURL = URLUtil.redirectToComponentSelectionSubmission(uuid, token, "urlString");
          }

          if (taskType === "security risk assessment") {
            taskRedirectURL = URLUtil.redirectToSecurityRiskAssessment(uuid, token, "urlString");
          }

          if (taskType === "control validation audit") {
            taskRedirectURL = URLUtil.redirectToControlValidationAudit(uuid, token, "urlString");
          }

          const links = (
            <Link to={taskRedirectURL}>
              {taskNameAndStatus}
            </Link>
          );

          return (
            <div key={uuid}>
              {unfinshedRQTaskMessage && taskType === 'security risk assessment' ? null : links}
            </div>
          );
        })}
      </div>
    );
  }

  renderButtons(submission: Submission) {
    const {
      user,
      viewAs,
      token,
      handleSubmitButtonClick,
      handlePDFDownloadButtonClick,
      handleApproveButtonClick,
      handleOptionalApproveButtonClick,
      handleAssignToMeButtonClick,
      handleDenyButtonClick,
      handleEditButtonClick
    } = {...this.props};

    const downloadPDFButton = (
      <LightButton title="DOWNLOAD PDF"
                   iconImage={pdfIcon}
                   classes={["button"]}
                   onClick={handlePDFDownloadButtonClick}/>
    );

    const viewAnswersButton = user ? (
      <LightButton title="VIEW ANSWERS"
                   classes={["button"]}
                   onClick={() => URLUtil.redirectToQuestionnaireReview(submission.submissionUUID, token)}
      />
    ) : '';


    // Display buttons for submitter
    if (viewAs === "submitter") {
      // Render edit answers button for submitter in all cases
      const editAnswersButton = (
        <LightButton title="EDIT ANSWERS"
                     iconImage={editIcon}
                     classes={["button"]}
                     onClick={handleEditButtonClick}
        />
      );

      // Render send for approval button for submitter only in specific submission status
      const sendForApprovalButton = (
        <DarkButton title="SEND FOR APPROVAL"
                    classes={["button"]}
                    disabled={SubmissionDataUtil.existsIncompleteTaskSubmission(submission.taskSubmissions)}
                    onClick={handleSubmitButtonClick}
        />
      );

      if (submission.status === "submitted") {
        return (
          <div className="buttons">
            <div>
              {editAnswersButton}
              {downloadPDFButton}
              {sendForApprovalButton}
            </div>
            <div/>
          </div>
        );
      }

      if (submission.status === "waiting_for_security_architect_approval" ||
        submission.status === "awaiting_security_architect_review") {
        return (
          <div className="buttons">
            <div>
              {editAnswersButton}
              {downloadPDFButton}
            </div>
            <div/>
          </div>
        );
      }

      return (
        <div className="buttons">
          <div>
            {downloadPDFButton}
          </div>
          <div/>
        </div>
      );
    }

    // Display buttons for approvers
    if (viewAs === "approver" || viewAs === "businessOwnerApprover") {
      const assignToMeButton = (
        <LightButton title="Assign to Me"
                    classes={["button"]}
                    onClick={handleAssignToMeButtonClick}
        />
      );
      const approveButton = (
        <DarkButton title="APPROVE"
                    classes={["button"]}
                    onClick={() => handleApproveButtonClick(this.state.skipBoAndCisoApproval)}
        />
      );
      const denyButton = (
        <LightButton title="DENY"
                     classes={["button"]}
                     onClick={() => handleDenyButtonClick(this.state.skipBoAndCisoApproval)}
        />
      );

      if (submission.status === "submitted") {
        return (
          <div className="buttons">
            <div>
              {viewAnswersButton}
              {downloadPDFButton}
            </div>
            <div/>
          </div>
        );
      }

      if (submission.status === "awaiting_security_architect_review") {
        return (
          <div className="buttons">
            <div>
              {viewAnswersButton}
              {downloadPDFButton}
              {assignToMeButton}
            </div>
            <div/>
          </div>
        );
      }

      return (
        <div className="buttons">
          <div>
            {viewAnswersButton}
            {downloadPDFButton}
          </div>
          <div>
            {approveButton}
            {denyButton}
          </div>
        </div>
      );
    }

    // Display buttons for others (either a submitter not an approver)
    return (
      <div className="buttons">
        <div>
          {viewAnswersButton}
          {downloadPDFButton}
        </div>
        <div/>
      </div>
    );
  }

  renderApprovals(submission: Submission) {
    // TODO: Refactor - consider using constants instead of string literal
    if (submission.status === "in_progress" ||
      submission.status === "submitted"
    ) {
      return null;
    }

    const approvalStatus = submission.approvalStatus;
    const securityArchitectApprover = submission.securityArchitectApprover;
    const cisoApprover = submission.cisoApprover;

    let securityArchitectApprovalStatus = prettifyStatus(approvalStatus.securityArchitect);

    if (securityArchitectApprovalStatus == "Approved") {
      securityArchitectApprovalStatus = securityArchitectApprover.FirstName + " " +
        securityArchitectApprover.Surname + " - " + securityArchitectApprovalStatus;
    }

    if (submission.status === "waiting_for_security_architect_approval") {
      securityArchitectApprovalStatus = "Being Reviewed by " + securityArchitectApprover.FirstName + " " +
        securityArchitectApprover.Surname;
    }

    let cisoApprovalStatus = prettifyStatus(approvalStatus.chiefInformationSecurityOfficer);
    if (cisoApprovalStatus !== "Pending" && cisoApprovalStatus !== "Not Required") {
      cisoApprovalStatus = cisoApprover.FirstName + " " + cisoApprover.Surname + " - " + cisoApprovalStatus;
    }

    let businessOwnerApprovalStatus = prettifyStatus(approvalStatus.businessOwner)
    if (businessOwnerApprovalStatus !== "Pending" && businessOwnerApprovalStatus !== 'Not Required') {
      businessOwnerApprovalStatus = submission.businessOwnerApproverName + " - " + businessOwnerApprovalStatus;
    }
    return (
      <div className="approvals">
        <h3>Approvals</h3>
        <div>
          <b>Security Architect</b>
          &nbsp;-&nbsp;
          {securityArchitectApprovalStatus}
        </div>
        <div>
          <b>Chief Information Security Officer</b>
          &nbsp;-&nbsp;
          {cisoApprovalStatus}
        </div>
        <div>
          <b>Business Owner</b>
          &nbsp;-&nbsp;
          {businessOwnerApprovalStatus}
        </div>
      </div>
    );
  }

  renderSkipCheckbox(submission: Submission, viewAs: string, user: User) {
    if ((user && !user.isSA) || !submission.isApprovalOverrideBySecurityArchitect) {
      return null;
    }
    if (viewAs === 'approver' && user.isSA &&
      submission.status === "waiting_for_security_architect_approval") {
        return (
          <div className="approvals">
            <h3>Skip Business Owner and CISO approval</h3>
            <label>
              <input
              type="checkbox"
              checked={this.state.skipBoAndCisoApproval}
              onChange={event => {
                this.setState({
                  skipBoAndCisoApproval: event.target.checked
                });
              }} />
              &nbsp; This deliverable does not modify the current risk rating for this
              project. Business Owner and CISO approval is not required
            </label>
          </div>
        );
    }

    return null;
  }
}

export default Summary;
