
I have been through the ppt, here are all my points in <comment> i have added associated <text> it refers to, each are within their own slide number title.  At all times this needs to be in sync with https://lively-tree-004b4fc10.2.azurestaticapps.net source: https://github.com/halmstraw/medtech-platform-docs 

# General note

<comment>
Provide citations / evidence for all current information.  The discussions came from Mark and Laurence.
</comment>
<comment>
When i spoke to the CTO Mark, these were the themes he was interested in.
Agentic AI
System design 
Release
Planning
Scaling
</comment>
<comment>
The whole presentation style isn't quite me, it's a bit too perfect, read through and remove any padding information.  Try to simplify all of the text.
</comment>
<comment>
For the cost, change to 10p+, i'm not sure if it is 17p not 7p, so keep it vague, the point is cost will be a problem.
</comment>
<text>
</text>
<comment>I want some diagram in this deck, even at the expense of removing words.  Add placeholders and a description of where diagrams can go.
</comment>

<comment>
Critically review against the brief, what areas have we missed, in some cases we are rambling in the wrong direction.
 Cloud architecture — how you'd approach a decoupled, scalable, resilient platform. Your view on event-driven architecture, micro-services, etc and trade offs
• Engineering principles and patterns — the non-negotiables you'd establish, and how you balance pragmatism against purity
• Client-side performance — approaches to optimisation on device, including GPU acceleration and what's realistic for compute-heavy workloads on mobile (video image processing etc)
• Process and delivery — agile/scrum tooling, team shape, planning cadence, and how architecture decisions get made and recorded
• Testing and CI/CD — your standards for test strategy, pipeline design, and release management
• Agentic AI in the SDLC — how you'd roll out agentic tooling across the engineering org, and crucially how you'd measure whether it's actually delivering value
• Forward-looking — a brief view on how the roadmap as the platform matures, and what would be worth investing in etc
</comment>

# Slide 2

<text>
WHERE WE ARE
CE Class IIa — EU MDR certified
Deployed in NHS primary care
FDA 510(k) / De Novo in progress
</text>
<comment>
Are these all true? what is CE Class IIa and FDA 510(k) / De Novo?
</comment>
<text>
Engineering wrapper must mature to FDA-submission standard
Small team, high regulatory bar
Scale economics need to improve
BP estimation: the hard frontier
</text>
<comment>
Do we know there are changes for FDA? 
Scale economics, are we talking cloud costs?
For BP estimation, specifically what is the hard frontier? getting the accuracy?
</comment>
<text>
</text>
<comment>
Is it the shape of the pulse signal that can be used for BP? Due to how much work is needed to pump?
</comment>

# Slide 3

<text>
~1% colour change masked by ISP, motion, skin tone bias
</text>
<comment>
What is ISP?
</comment>
<text>
SBP the persistent unsolved problem
</text>
<comment>
What does this mean?
</comment>
<text>
IEC 62304, ISO 14971, GDPR, NHS DSPT
FDA cybersecurity guidance 2023
</text>
<comment>
This needs some type of citation, i would look stupid if it is wrong\
</comment>
<text>
Engineering model must scale before headcount does
</text>
<comment>
It isn't just engineering model, the cost is part of it.  But the whole team will need to handle the scaling, every role is impacted by volumes of customers and bp tests.
</comment>

# Slide 4
<text>THE BLUEPRINT: FOUR THEMES
</text>
<comment>
I don't like calling these "themes", what is a better term? Layer, Area?  We should also say they are the top 4, we are aware of others and list them, but can't cover in the time.
</comment>
<text>
THEME B
ENGINEERING GOVERNANCE
</text>
<comment>
We renamed to something more architecture focussed to stop stepping on toes
</comment>
<text>
cloud inference
</text>
<comment>
What does cloud inference mean?
</comment>

# Slide 6
<text>
Target State
</text>
<comment>
Check this again our platform documentation, it looks different.  I thought we were hand rolling the service bus in rust.  https://lively-tree-004b4fc10.2.azurestaticapps.net
</comment>

# Slide 7
<text>
SERVICE BOUNDARIES: WHERE AND WHY NOT
</text>
<comment>
We can do a picture for this, and also use in the platform documentation
</comment>

# Slide 8
<text>
CI-ENFORCED QUALITY GATES
</text>
<comment>
Check these are the chosen technologies in our platform docs, if not lets correct so they are consistent.
</comment>
<text>
People and governance:
</text>
<comment>
Remove the "I invest in people" it sounds corny, just make the point that we can force process and regulation, it has to be explained and understood, it should be engrained in everything we do.
</comment>

# Slide 9 
<text>
welcome
AI-merged tests are not
</text>
<comment>
I don't think this text is needed.
</comment>
<text>
IEC 62304 §5.7 artefact
</text>
<comment>
Explain this
</comment>
<text>
The compliance agent enforces traceability linkage at PR time — making drift visible before it becomes a problem.
</text>
<comment>
We haven't talked about agents yet, so this is confusing.
</comment>
<text>
Bland-Altman vs auscultatory reference
Fitzpatrick I–VI skin tone stratification
Longitudinal stability required
FDA De Novo submission artefact
</text>
<comment>
What is this? If it is valid, we need to add into the platform docs so i can understand.
</comment>

# Slide 10
<text>
Immutable artefact registry (ACR)
</text>
<comment>
What is ACR
</comment>
<text>
Instrumentation
</text>
<comment>
Ensure both sections align with platform documentation
</comment>

# Slide 12
<text>
FDA controlled release evidence maintained cloud-side
</text>
<comment>
Is this really FDA? has it been made up?
</comment>
<text>
ME-rPPG (2025): 3.6 MB, 9.46 ms latency — on-device DL benchmark  |  Pruning + quantisation: up to 46× size reduction
</text>
<comment>
What is this?
</comment>
<text>Trade-off: On-device extraction reduces cost, improves privacy, enables offline operation. Trade-off: mobile CI/CD complexity and validation across a fragmented device/OS matrix. Phase 2 priority, not day one.
</text>
<comment>
Does this mean we are just passing the raw data for day 1?  If so we should have a roadmap slide.
</comment>

# Slide 13
<text>
Agentic AI
</text>
<comment>
Should we have another zone? Something across to administer, like a knowledge zone.  A central store where anyone can ask questions about anything happening in the company.
</comment>

# Slide 14
<text>Instrument the tooling. Don't fly blind on AI ROI.
</text>
<comment>
What is this? AI Return on Investment or Region of Interest? Make it clearer.  We saying instrument everything, the final product and the process that delivers it. Don't make a change without it being measured, otherwise how do we know it has improved?
</comment>
<text>
Engineer satisfaction (quarterly)
</text>
<comment>
Is this like DORA? I think in such a small company we could do this with SCRUM retrospectives, but really light ones.
</comment>
<text>
Governance
All prompts version-controlled. LLM tooling: data residency compliant, no training on proprietary code. Quarterly review cycle.
</text>
<comment>
Is this relevant to the slide? it isn't about measurement
</comment>

# Slide §5
<text>
ADRs 001–007 written
</text>
<comment>
What are these ADRs? Why 7?
</comment>
<text>
ROADMAP: FOUR PHASES
</text>
<comment>
I think we are missing a discover phase, like wardley maps, what drives the most value, what can be done to increase the value.  We might need some quick changes to stabilise the product, or give confidence, it depends on what feedback is coming from the pilot.  We need to be focussed on sales and then have the architecture to back it up scaling.
This roadmap is wrong.
</comment>

# Slide 16
<text>
Build on-device/cloud abstraction now — model location swappable later
</text>
<comment>What does this mean? We are abstracting all the code to allow it to be swapped as needed?
</comment>


<text>ME-rPPG shows <10ms on-device inference achievable
</text>
<comment>
what is ME-rPPG, provide a citation
</comment>

<text>Best public benchmark (MMPD): only 33 subjects
</text>
<comment>provide reference
</comment>


<text>Diverse, longitudinal, smartphone-captured dataset
A differentiator no competitor can quickly replicate
</text>
<comment>explain these bullets, re-write if we need.
</comment>

<text>SELF-SUPERVISED PRE-TRAINING
Contrastive learning on unlabelled facial video
</text>
<comment>Explain this section, if we want to pitch this it needs to be in the platform docs
</comment>

# Slide 17
<text>Cost model
</text>
<comment>Is this just reducing BP inference to less than 1p? If so it isn't a model.  If something else then it needs to be in platform docs.
</comment>

# Slide 18
<text>DBP approaches clinical thresholds in controlled conditions; SBP does not.
</text>
<comment>What is DBP and SBP?
</comment>
<text>BP advisory with confidence bounds — with a credible path to clinical-grade BP as the evidence base grows.
</text>
<comment>Should we say that? It says the product of the company i want to join can only be used as advisory, they have not got it to clinical grade.  Is that even true? we don't know.
</comment>


<text>
</text>
<comment>
</comment>


<text>
</text>
<comment>
</comment>

<text>
</text>
<comment>
</comment>


<text>
</text>
<comment>
</comment>

<text>
</text>
<comment>
</comment>

<text>
</text>
<comment>
</comment>

<text>
</text>
<comment>
</comment>