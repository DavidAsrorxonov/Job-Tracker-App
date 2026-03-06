import { IInterviewData } from "@/lib/models/job-application";
import {
  Brain,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
} from "lucide-react";

type SingleInterview = IInterviewData["interviews"][number];

const typeConfig: Record<
  SingleInterview["type"],
  { label: string; icon: React.ElementType }
> = {
  phone_screen: { label: "Phone Screen", icon: Phone },
  technical: { label: "Technical", icon: Code2 },
  behavioral: { label: "Behavioral", icon: Brain },
  hiring_manager: { label: "Hiring Manager", icon: UserCheck },
  final: { label: "Final Round", icon: Trophy },
  other: { label: "Other", icon: HelpCircle },
};

const InterviewCard = ({
  interviewData,
  onClick,
}: {
  interviewData: IInterviewData;
  onClick: () => void;
}) => {
  const mockInterviewData: IInterviewData = {
    interviews: [
      {
        //   _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        type: "phone_screen",
        scheduledDate: new Date("2026-02-15T10:00:00"),
        completedDate: new Date("2026-02-15T10:30:00"),
        duration: 30,
        interviewer: "Sarah Johnson (HR)",
        notes:
          "Very friendly conversation, asked about my background and motivation. They seem to move fast.",
        questionsAsked: [
          "Tell me about yourself",
          "Why are you interested in this role?",
          "What's your expected salary?",
        ],
        outcome: "passed",
        rating: 4,
      },
      {
        //   _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
        type: "technical",
        scheduledDate: new Date("2026-02-22T14:00:00"),
        completedDate: new Date("2026-02-22T15:30:00"),
        duration: 90,
        interviewer: "Mike Chen (Senior Engineer)",
        notes:
          "Heavy focus on system design. Got a bit stuck on the distributed cache question but recovered well.",
        questionsAsked: [
          "Design a URL shortener",
          "Explain CAP theorem",
          "Reverse a linked list",
        ],
        outcome: "waiting",
        rating: 3,
      },
      {
        //   _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
        type: "behavioral",
        scheduledDate: new Date("2026-03-10T11:00:00"),
        duration: 60,
        interviewer: "Lisa Park (Engineering Manager)",
        notes: "",
        questionsAsked: [],
        outcome: undefined,
        rating: undefined,
      },
    ],
    prepNotes:
      "Research their recent Series B funding. They use a microservices architecture. Emphasize my experience with distributed systems and React.",
    questionsToAsk: [
      "What does the onboarding process look like?",
      "How does the team handle technical debt?",
      "What's the biggest challenge the team is facing right now?",
    ],
    technicalTopics: [
      "System design",
      "React performance",
      "TypeScript",
      "REST vs GraphQL",
      "CI/CD pipelines",
    ],
    nextSteps:
      "Waiting for feedback on the technical round. Follow up by March 5th if no response.",
  };

  return <div>{}</div>;
};

export default InterviewCard;
