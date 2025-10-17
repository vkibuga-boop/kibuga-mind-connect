-- Add more psychometric assessments with real questions

-- Alcohol Use Disorders Identification Test (AUDIT)
INSERT INTO psychometric_assessments (id, name, description, category, result_fee_kes, result_fee_usd, questions)
VALUES (
  'a1b2c3d4-5678-90ab-cdef-111111111111'::uuid,
  'AUDIT (Alcohol Use Disorders Identification Test)',
  'A 10-item screening tool to identify hazardous and harmful patterns of alcohol consumption.',
  'Substance Use',
  150,
  2,
  '[
    {
      "id": "audit_q1",
      "text": "How often do you have a drink containing alcohol?",
      "type": "single",
      "options": ["Never", "Monthly or less", "2-4 times a month", "2-3 times a week", "4 or more times a week"]
    },
    {
      "id": "audit_q2",
      "text": "How many standard drinks containing alcohol do you have on a typical day?",
      "type": "single",
      "options": ["1-2", "3-4", "5-6", "7-9", "10 or more"]
    },
    {
      "id": "audit_q3",
      "text": "How often do you have six or more drinks on one occasion?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q4",
      "text": "During the past year, how often have you found that you were not able to stop drinking once you had started?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q5",
      "text": "During the past year, how often have you failed to do what was normally expected of you because of drinking?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q6",
      "text": "During the past year, how often have you needed a drink in the morning to get yourself going after a heavy drinking session?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q7",
      "text": "During the past year, how often have you had a feeling of guilt or remorse after drinking?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q8",
      "text": "During the past year, have you been unable to remember what happened the night before because you had been drinking?",
      "type": "single",
      "options": ["Never", "Less than monthly", "Monthly", "Weekly", "Daily or almost daily"]
    },
    {
      "id": "audit_q9",
      "text": "Have you or someone else been injured as a result of your drinking?",
      "type": "single",
      "options": ["No", "Yes, but not in the past year", "Yes, during the past year"]
    },
    {
      "id": "audit_q10",
      "text": "Has a relative, friend, doctor, or other health worker been concerned about your drinking or suggested you cut down?",
      "type": "single",
      "options": ["No", "Yes, but not in the past year", "Yes, during the past year"]
    }
  ]'::jsonb
);

-- Social Anxiety Disorder (SPIN - Social Phobia Inventory)
INSERT INTO psychometric_assessments (id, name, description, category, result_fee_kes, result_fee_usd, questions)
VALUES (
  'a1b2c3d4-5678-90ab-cdef-222222222222'::uuid,
  'SPIN (Social Phobia Inventory)',
  'A 17-item questionnaire to assess the severity of social anxiety disorder symptoms.',
  'Anxiety',
  150,
  2,
  '[
    {
      "id": "spin_q1",
      "text": "I am afraid of people in authority.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q2",
      "text": "I am bothered by blushing in front of people.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q3",
      "text": "Parties and social events scare me.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q4",
      "text": "I avoid talking to people I do not know.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q5",
      "text": "Being criticized scares me a lot.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q6",
      "text": "Fear of embarrassment causes me to avoid doing things or speaking to people.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q7",
      "text": "Sweating in front of people causes me distress.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q8",
      "text": "I avoid going to parties.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q9",
      "text": "I avoid activities in which I am the center of attention.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q10",
      "text": "Talking to strangers scares me.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q11",
      "text": "I avoid having to give speeches.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q12",
      "text": "I would do anything to avoid being criticized.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q13",
      "text": "Heart palpitations bother me when I am around people.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q14",
      "text": "I am afraid of doing things when people might be watching.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q15",
      "text": "Being embarrassed or looking stupid are among my worst fears.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q16",
      "text": "I avoid speaking to anyone in authority.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "spin_q17",
      "text": "Trembling or shaking in front of others is distressing to me.",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    }
  ]'::jsonb
);

-- Beck Depression Inventory (BDI-II) - Simplified version
INSERT INTO psychometric_assessments (id, name, description, category, result_fee_kes, result_fee_usd, questions)
VALUES (
  'a1b2c3d4-5678-90ab-cdef-333333333333'::uuid,
  'BDI-II (Beck Depression Inventory)',
  'A 21-item assessment for measuring the severity of depression symptoms.',
  'Mental Health',
  150,
  2,
  '[
    {
      "id": "bdi_q1",
      "text": "Sadness",
      "type": "single",
      "options": ["I do not feel sad", "I feel sad much of the time", "I am sad all the time", "I am so sad or unhappy that I cannot stand it"]
    },
    {
      "id": "bdi_q2",
      "text": "Pessimism",
      "type": "single",
      "options": ["I am not discouraged about my future", "I feel more discouraged about my future than I used to", "I do not expect things to work out for me", "I feel my future is hopeless and will only get worse"]
    },
    {
      "id": "bdi_q3",
      "text": "Past Failure",
      "type": "single",
      "options": ["I do not feel like a failure", "I have failed more than I should have", "As I look back, I see a lot of failures", "I feel I am a total failure as a person"]
    },
    {
      "id": "bdi_q4",
      "text": "Loss of Pleasure",
      "type": "single",
      "options": ["I get as much pleasure as I ever did", "I do not enjoy things as much as I used to", "I get very little pleasure from things I used to enjoy", "I cannot get any pleasure from things I used to enjoy"]
    },
    {
      "id": "bdi_q5",
      "text": "Guilty Feelings",
      "type": "single",
      "options": ["I do not feel particularly guilty", "I feel guilty over many things I have done or should have done", "I feel quite guilty most of the time", "I feel guilty all of the time"]
    },
    {
      "id": "bdi_q6",
      "text": "Punishment Feelings",
      "type": "single",
      "options": ["I do not feel I am being punished", "I feel I may be punished", "I expect to be punished", "I feel I am being punished"]
    },
    {
      "id": "bdi_q7",
      "text": "Self-Dislike",
      "type": "single",
      "options": ["I feel the same about myself as ever", "I have lost confidence in myself", "I am disappointed in myself", "I dislike myself"]
    },
    {
      "id": "bdi_q8",
      "text": "Self-Criticalness",
      "type": "single",
      "options": ["I do not criticize or blame myself more than usual", "I am more critical of myself than I used to be", "I criticize myself for all of my faults", "I blame myself for everything bad that happens"]
    },
    {
      "id": "bdi_q9",
      "text": "Crying",
      "type": "single",
      "options": ["I do not cry anymore than I used to", "I cry more than I used to", "I cry over every little thing", "I feel like crying, but I cannot"]
    },
    {
      "id": "bdi_q10",
      "text": "Agitation",
      "type": "single",
      "options": ["I am no more restless or wound up than usual", "I feel more restless or wound up than usual", "I am so restless or agitated that it is hard to stay still", "I am so restless or agitated that I have to keep moving or doing something"]
    }
  ]'::jsonb
);

-- Perceived Stress Scale (PSS-10)
INSERT INTO psychometric_assessments (id, name, description, category, result_fee_kes, result_fee_usd, questions)
VALUES (
  'a1b2c3d4-5678-90ab-cdef-444444444444'::uuid,
  'PSS-10 (Perceived Stress Scale)',
  'A 10-item scale measuring the degree to which situations in life are appraised as stressful.',
  'Mental Health',
  150,
  2,
  '[
    {
      "id": "pss_q1",
      "text": "In the last month, how often have you been upset because of something that happened unexpectedly?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q2",
      "text": "In the last month, how often have you felt that you were unable to control the important things in your life?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q3",
      "text": "In the last month, how often have you felt nervous and stressed?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q4",
      "text": "In the last month, how often have you felt confident about your ability to handle your personal problems?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q5",
      "text": "In the last month, how often have you felt that things were going your way?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q6",
      "text": "In the last month, how often have you found that you could not cope with all the things that you had to do?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q7",
      "text": "In the last month, how often have you been able to control irritations in your life?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q8",
      "text": "In the last month, how often have you felt that you were on top of things?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q9",
      "text": "In the last month, how often have you been angered because of things that were outside of your control?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    },
    {
      "id": "pss_q10",
      "text": "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
      "type": "scale",
      "scaleMin": 0,
      "scaleMax": 4
    }
  ]'::jsonb
);