import type { SafetyOption, SafetyQuestion } from "@/types/health-safety";

function options(
  established: string,
  partial: string,
  missing: string,
  seriousConcern?: string,
): readonly SafetyOption[] {
  return [
    { id: "established", label: established },
    { id: "partial", label: partial },
    { id: "missing", label: missing, seriousConcern },
    { id: "unsure", label: "I'm not sure — this needs to be verified." },
  ];
}

// General workplace practices, informed by ILO OSH guidance. These questions
// do not determine compliance with any jurisdiction's laws or certify safety.
export const healthSafetySources = [
  {
    title: "ILO: Planning and implementation",
    url: "https://www.ilo.org/topics-and-sectors/occupational-safety-and-health-guide-labour-inspectors-and-other/how-can-occupational-safety-and-health-be-managed/planning-and-implementation",
  },
  {
    title: "ILO: Evaluation and continual improvement",
    url: "https://www.ilo.org/topics-and-sectors/occupational-safety-and-health-guide-labour-inspectors-and-other/how-can-occupational-safety-and-health-be-managed/evaluation",
  },
] as const;

export const healthSafetyQuestions: readonly SafetyQuestion[] = [
  {
    id: "responsibilities",
    topic: "Safety responsibilities",
    prompt: "How are health and safety responsibilities managed in your workplace?",
    help: "Think about who owns safety decisions, the written policy, and how workers hear about it.",
    options: options(
      "We have a current written policy, a named responsible person, and communicate responsibilities to workers.",
      "Someone handles safety, but our policy or communication needs updating.",
      "We have no clear safety policy or assigned responsibilities.",
    ),
    strength: "You report a communicated safety policy and clear ownership.",
    recommendation: "Assign a responsible person with suitable knowledge, document your safety policy, and communicate responsibilities to everyone at work.",
  },
  {
    id: "risk-assessment",
    topic: "Risk assessments",
    prompt: "How do you identify workplace hazards and manage the risks?",
    help: "Include everyday tasks, visitors, contractors, and changes to equipment or working methods.",
    options: options(
      "We document risk assessments, apply controls, and review them when work changes.",
      "We identify some hazards, but our assessments or follow-up are incomplete.",
      "We do not assess workplace hazards or put planned risk controls in place.",
      "Workplace hazards may be unmanaged because risk assessments and planned controls are absent.",
    ),
    strength: "You report documented assessments with controls and reviews when work changes.",
    recommendation: "Arrange a competent assessment of tasks and hazards with workers, prioritise risks, and record controls, owners, and review dates. Eliminate hazards where possible before relying on protective equipment.",
  },
  {
    id: "training",
    topic: "Safety training",
    prompt: "What safety training do workers receive before carrying out their tasks?",
    help: "Consider new starters, temporary workers, contractors, and refresher training.",
    options: options(
      "Everyone receives relevant induction and task training, with records and refresher checks.",
      "Some training is provided, but coverage, records, or refresher checks are incomplete.",
      "Workers start tasks without relevant safety instruction or training.",
      "Workers may be performing tasks without the safety knowledge needed to manage the risks.",
    ),
    strength: "You report relevant induction, task training, and refresher checks.",
    recommendation: "Provide induction and task-specific instruction before work starts, verify understanding, and record training. Include temporary workers and contractors.",
  },
  {
    id: "emergency",
    topic: "Emergency readiness",
    prompt: "How prepared is your workplace for a fire or other emergency?",
    help: "Consider alarms, clear escape routes, evacuation responsibilities, and drills for all shifts.",
    options: options(
      "Escape routes are clear, emergency arrangements are maintained, and everyone practises evacuation.",
      "Routes are clear and arrangements exist, but drills or maintenance checks need improvement.",
      "Escape routes are obstructed or usable evacuation arrangements are missing.",
      "Obstructed escape routes or missing evacuation arrangements could put people at serious risk during an emergency.",
    ),
    strength: "You report clear escape routes and maintained, practised emergency arrangements.",
    recommendation: "Keep escape routes clear and usable, arrange competent checks of alarms and emergency equipment, and establish an accessible evacuation plan with regular drills.",
  },
  {
    id: "first-aid",
    topic: "First aid",
    prompt: "What first-aid arrangements are available when people are at work?",
    help: "Think about access to supplies, appropriate trained cover, and knowing how to get help.",
    options: options(
      "We have assessed our needs, maintain supplies and suitable trained cover, and explain how to get help.",
      "Supplies and some cover exist, but coverage or information needs improvement.",
      "There are no accessible first-aid supplies or arrangements for getting help.",
      "A lack of accessible first-aid arrangements could delay help after an injury.",
    ),
    strength: "You report assessed first-aid needs, maintained supplies, and suitable cover.",
    recommendation: "Assess first-aid needs for your activities and shifts, provide accessible supplies and suitable trained cover, and tell workers how to obtain assistance.",
  },
  {
    id: "equipment",
    topic: "Equipment and protective measures",
    prompt: "How do you keep equipment and protective measures safe for use?",
    help: "Include electrical equipment, tools, guards, and protective equipment where your risk assessment requires it.",
    options: options(
      "Equipment is checked and maintained; required guards and protective equipment are provided and used.",
      "Controls are generally in place, but inspection, maintenance, or use is inconsistent.",
      "Unsafe equipment remains in use, or required guards or protective equipment are missing.",
      "Unsafe equipment or missing required protective measures may expose workers to serious harm.",
    ),
    strength: "You report equipment checks, maintenance, and use of required protective measures.",
    recommendation: "Remove unsafe equipment from use and have a competent person assess it. Maintain inspection records, effective guards, and suitable protective equipment where residual risks require it.",
  },
  {
    id: "incident-reporting",
    topic: "Incident reporting",
    prompt: "What happens when an accident, near miss, or work-related illness is reported?",
    help: "A near miss is an event that could have caused harm, even when nobody was injured.",
    options: options(
      "Workers know how to report; we record, investigate, and track corrective actions.",
      "We record some incidents, but near misses or follow-up actions are often missed.",
      "There is no clear reporting process or investigation of incidents.",
    ),
    strength: "You report a clear incident process with investigations and tracked actions.",
    recommendation: "Make reporting straightforward, include near misses and work-related illness, investigate causes, and track corrective actions. Check applicable reporting obligations with a competent adviser.",
  },
  {
    id: "workplace-health",
    topic: "Workplace health and conditions",
    prompt: "How do you manage working conditions that could affect people's health?",
    help: "Consider ventilation, housekeeping, workstation setup, manual handling, exposure to substances, and work-related stress as relevant.",
    options: options(
      "We assess relevant health risks, provide suitable conditions, and regularly check controls with workers.",
      "We address some health risks, but checks or controls are incomplete.",
      "We do not assess or manage health risks from working conditions.",
    ),
    strength: "You report regular checks and controls for relevant workplace health risks.",
    recommendation: "Review relevant physical and mental health risks with workers, improve working conditions, and seek competent advice for exposures or tasks requiring specialist assessment.",
  },
  {
    id: "worker-involvement",
    topic: "Worker involvement",
    prompt: "How are workers involved in safety decisions and raising concerns?",
    help: "Include workers with different needs, shifts, or working arrangements.",
    options: options(
      "We consult workers regularly and provide a clear way to raise concerns and receive feedback.",
      "Workers can raise concerns, but consultation or feedback is inconsistent.",
      "Workers have no clear way to raise safety concerns or contribute to decisions.",
    ),
    strength: "You report regular worker consultation and feedback on concerns.",
    recommendation: "Create an accessible route for raising concerns without fear of retaliation, consult workers before changes, and explain what action follows their feedback.",
  },
  {
    id: "review",
    topic: "Reviews and improvement",
    prompt: "How do you check that your safety arrangements remain effective and up to date?",
    help: "Consider workplace inspections, action tracking, changes to work, and requirements that apply to your location and industry.",
    options: options(
      "We carry out planned reviews, track improvements, and check applicable requirements with competent support.",
      "We review occasionally, but actions or checks of applicable requirements are incomplete.",
      "We do not review our arrangements or track improvements.",
    ),
    strength: "You report planned reviews, tracked improvements, and checks of applicable requirements.",
    recommendation: "Plan regular inspections and reviews, assign owners and deadlines to improvements, and obtain competent advice on requirements for your location and activities.",
  },
];
