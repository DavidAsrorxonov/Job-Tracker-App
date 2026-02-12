import mongoose, { Schema, Document } from "mongoose";

export interface IWishlistData {
  researchNotes?: string;
  pros?: string[];
  cons?: string[];
  priority?: "high" | "medium" | "low";
  targetApplyDate?: Date;
  companyInfo?: {
    size?: string;
    industry?: string;
    culture?: string;
  };
  requirementsMatch?: {
    mustHave?: string[];
    niceToHave?: string[];
    gaps?: string[];
  };
}

export interface IAppliedData {
  appliedDate: Date;
  applicationMethod?: "linkedin" | "company_site" | "referral" | "other";
  resumeVersion?: string;
  coverLetterUsed?: boolean;
  referralContact?: string;
  followUpDates?: Date[];
  lastFollowUpDate?: Date;
  expectedResponseDate?: Date;
  applicationNotes?: string;
}

export interface IInterviewData {
  interviews: Array<{
    _id?: mongoose.Types.ObjectId;
    type:
      | "phone_screen"
      | "technical"
      | "behavioral"
      | "hiring_manager"
      | "final"
      | "other";
    scheduledDate?: Date;
    completedDate?: Date;
    duration?: number;
    interviewer?: string;
    notes?: string;
    questionsAsked?: string[];
    outcome?: "passed" | "waiting" | "failed";
    rating?: number;
  }>;
  prepNotes?: string;
  questionsToAsk?: string[];
  technicalTopics?: string[];
  nextSteps?: string;
}

export interface IOfferData {
  offerReceivedDate?: Date;
  offerDeadline?: Date;
  baseSalary?: number;
  currency?: string;
  equity?: {
    type?: "equity" | "stock" | "rsu" | "none" | "other";
    amount?: number;
  };
  bonus?: {
    signing?: number;
    annual?: number;
    performance?: string;
  };
  benefits?: string[];
  startDate?: Date;
  negotiationNotes?: string;
  prosAndCons?: {
    pros?: string[];
    cons?: string[];
  };
  decision?: "accepted" | "rejected" | "negotiating" | "considering";
  decisionDate?: Date;
}

export interface IRejectedData {
  rejectedDate?: Date;
  rejectionStage:
    | "before_apply"
    | "after_apply"
    | "after_screen"
    | "after_interview"
    | "after_offer";
  rejectionReason?: string;
  feedback?: string;
  lessonsLearned?: string;
  reapplyDate?: Date;
  wouldReapply?: boolean;
}

export interface IJobApplication extends Document {
  company: string;
  position: string;
  location?: string;
  status: string;
  columnId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  userId: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: Date;
  tags?: string[];
  description?: string;

  wishlistData?: IWishlistData;
  appliedData?: IAppliedData;
  interviewData?: IInterviewData;
  offerData?: IOfferData;
  rejectedData?: IRejectedData;

  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "applied",
    },
    columnId: {
      type: mongoose.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
    boardId: {
      type: mongoose.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
    },
    salary: {
      type: String,
    },
    jobUrl: {
      type: String,
    },
    appliedDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },

    wishlistData: {
      researchNotes: String,
      pros: [String],
      cons: [String],
      priority: {
        type: String,
        enum: ["high", "medium", "low"],
      },
      targetApplyDate: Date,
      companyInfo: {
        size: String,
        industry: String,
        culture: String,
      },
      requirementsMatch: {
        mustHave: [String],
        niceToHave: [String],
        gaps: [String],
      },
    },

    appliedData: {
      appliedDate: Date,
      applicationMethod: {
        type: String,
        enum: ["linkedin", "company_site", "referral", "other"],
      },
      resumeVersion: String,
      coverLetterUsed: Boolean,
      referralContact: String,
      followUpDates: [Date],
      lastFollowUpDate: Date,
      expectedResponseDate: Date,
      applicationNotes: String,
    },

    interviewData: {
      interviews: [
        {
          type: {
            type: String,
            enum: [
              "phone_screen",
              "technical",
              "behavioral",
              "hiring_manager",
              "final",
              "other",
            ],
            required: true,
          },
          scheduledDate: Date,
          completedDate: Date,
          duration: Number,
          interviewer: String,
          notes: String,
          questionsAsked: [String],
          outcome: {
            type: String,
            enum: ["passed", "waiting", "failed"],
          },
          rating: Number,
        },
      ],
      prepNotes: String,
      questionsToAsk: [String],
      technicalTopics: [String],
      nextSteps: String,
    },

    offerData: {
      offerReceivedDate: Date,
      offerDeadline: Date,
      baseSalary: Number,
      currency: String,
      equity: {
        type: {
          type: String,
          enum: ["equity", "stock", "rsu", "none", "other"],
        },
        amount: Number,
      },
      bonus: {
        signing: Number,
        annual: Number,
        performance: String,
      },
      benefits: [String],
      startDate: Date,
      negotiationNotes: String,
      prosAndCons: {
        pros: [String],
        cons: [String],
      },
      decision: {
        type: String,
        enum: ["accepted", "rejected", "negotiating", "considering"],
      },
      decisionDate: Date,
    },

    rejectedData: {
      rejectedDate: Date,
      rejectionStage: {
        type: String,
        enum: [
          "before_apply",
          "after_apply",
          "after_screen",
          "after_interview",
          "after_offer",
        ],
      },
      rejectionReason: String,
      feedback: String,
      lessonsLearned: String,
      reapplyDate: Date,
      wouldReapply: Boolean,
    },
  },
  { timestamps: true },
);

export default mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
