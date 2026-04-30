import { useState } from "react";

// ─── Brand palette (matches Lifelight / medtech-platform-docs) ───────────────
const C = {
  bg:          '#080f1e',
  surface:     '#0c1827',
  green:       '#00c389',
  greenDim:    '#041f14',
  orange:      '#f97316',
  orangeDim:   '#2a1100',
  blue:        '#60a5fa',
  blueDim:     '#0a1e40',
  purple:      '#a78bfa',
  purpleDim:   '#160d35',
  red:         '#f87171',
  redDim:      '#280808',
  yellow:      '#fbbf24',
  yellowDim:   '#1a1000',
  teal:        '#2dd4bf',
  tealDim:     '#041a18',
  white:       '#f1f5f9',
  muted:       '#3d5470',
  mutedLight:  '#94a3b8',
  border:      '#172840',
  text:        '#e2e8f0',
};

// ─── Font import ──────────────────────────────────────────────────────────────
function FontStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: ${C.bg}; }
      button { outline: none; cursor: pointer; }
      button:focus-visible { outline: 2px solid ${C.green}; outline-offset: 2px; }
    `}</style>
  );
}

// ─── SVG primitives ───────────────────────────────────────────────────────────

/** Arrow-head markers. Call once per SVG. */
function Defs() {
  const markers = [
    ['g',  C.green],
    ['o',  C.orange],
    ['b',  C.blue],
    ['p',  C.purple],
    ['r',  C.red],
    ['m',  C.mutedLight],
    ['y',  C.yellow],
    ['t',  C.teal],
  ];
  return (
    <defs>
      {markers.map(([id, fill]) => (
        <marker key={id} id={`a-${id}`}
          markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

/** A labelled directional arrow. color = 'g'|'o'|'b'|'p'|'r'|'m'|'y'|'t' */
function Arrow({ x1, y1, x2, y2, label, color = 'm', dx = 0, dy = 0 }) {
  const col = { g:C.green, o:C.orange, b:C.blue, p:C.purple,
                r:C.red,   m:C.mutedLight, y:C.yellow, t:C.teal }[color] || C.mutedLight;
  const mx = (x1 + x2) / 2 + dx;
  const my = (y1 + y2) / 2 + dy;
  const lw = label ? Math.max(label.length * 5.8 + 10, 60) : 0;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={col} strokeWidth={1.5} opacity={0.65}
        markerEnd={`url(#a-${color})`} />
      {label && <>
        <rect x={mx - lw/2} y={my - 8} width={lw} height={15}
          fill={C.bg} rx={3} opacity={0.95} />
        <text x={mx} y={my + 4.5} textAnchor="middle"
          fill={col} fontSize={8.5} fontFamily="DM Mono, monospace" opacity={0.9}>
          {label}
        </text>
      </>}
    </g>
  );
}

/** Dashed deployment boundary box with label */
function Zone({ x, y, w, h, label, color = C.blue }) {
  const ll = label.length * 5.6 + 14;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill="none" stroke={color} strokeWidth={1}
        strokeDasharray="6,4" opacity={0.4} />
      <rect x={x + 14} y={y - 8} width={ll} height={16}
        fill={C.bg} />
      <text x={x + 21} y={y + 4}
        fill={color} fontSize={9} fontWeight={600} opacity={0.75}
        fontFamily="DM Mono, monospace">{label}</text>
    </g>
  );
}

/** Person (actor) box */
function Person({ x, y, name, role, w = 128, h = 150 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill="#0d1e35" stroke={C.blue} strokeWidth={1.5} />
      {/* head */}
      <circle cx={x + w/2} cy={y + 32} r={15}
        fill={C.blue} opacity={0.35} />
      {/* shoulders */}
      <path d={`M${x+w/2-20} ${y+70} Q${x+w/2} ${y+52} ${x+w/2+20} ${y+70}`}
        fill={C.blue} opacity={0.25} />
      <text x={x+w/2} y={y+85} textAnchor="middle"
        fill={C.white} fontSize={11} fontWeight={700}
        fontFamily="DM Sans, sans-serif">{name}</text>
      <text x={x+w/2} y={y+98} textAnchor="middle"
        fill={C.blue} fontSize={8} fontFamily="DM Mono, monospace">[Person]</text>
      {/* role – wrap at ~18 chars */}
      {role.split('\n').map((line, i) => (
        <text key={i} x={x+w/2} y={y+114+i*13} textAnchor="middle"
          fill={C.mutedLight} fontSize={9} fontFamily="DM Sans, sans-serif">{line}</text>
      ))}
    </g>
  );
}

/** Software system box (context level) */
function System({ x, y, w, h, title, sub, external = false, note }) {
  const bg     = external ? '#0b1520' : C.greenDim;
  const border = external ? C.muted   : C.green;
  const tcolor = external ? C.mutedLight : C.green;
  const badge  = external ? '[External System]' : '[Software System]';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={bg} stroke={border} strokeWidth={1.5} />
      <text x={x+w/2} y={y+22} textAnchor="middle"
        fill={tcolor} fontSize={12} fontWeight={700}
        fontFamily="DM Sans, sans-serif">{title}</text>
      <text x={x+w/2} y={y+35} textAnchor="middle"
        fill={border} fontSize={8} fontFamily="DM Mono, monospace">{badge}</text>
      {sub && (
        <text x={x+w/2} y={y+50} textAnchor="middle"
          fill={C.mutedLight} fontSize={9} fontFamily="DM Sans, sans-serif">{sub}</text>
      )}
      {note && (
        <text x={x+w/2} y={y+65} textAnchor="middle"
          fill={C.muted} fontSize={8.5} fontFamily="DM Mono, monospace">{note}</text>
      )}
    </g>
  );
}

/** Container box (container level) */
function Box({ x, y, w, h, title, badge, lines = [], bg, border }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6}
        fill={bg} stroke={border} strokeWidth={1.5} />
      <text x={x+w/2} y={y+20} textAnchor="middle"
        fill={C.white} fontSize={11} fontWeight={700}
        fontFamily="DM Sans, sans-serif">{title}</text>
      <text x={x+w/2} y={y+32} textAnchor="middle"
        fill={border} fontSize={8} fontFamily="DM Mono, monospace">{badge}</text>
      {lines.map((l, i) => (
        <text key={i} x={x+w/2} y={y+47+i*13} textAnchor="middle"
          fill={C.mutedLight} fontSize={8.5} fontFamily="DM Mono, monospace">{l}</text>
      ))}
    </g>
  );
}

/** Small inline warning badge */
function Gap({ x, y, w, lines }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={lines.length*16+28} rx={6}
        fill="#0d0606" stroke={C.red} strokeWidth={1} strokeDasharray="4,3" />
      <text x={x+w/2} y={y+16} textAnchor="middle"
        fill={C.red} fontSize={9} fontWeight={700} fontFamily="DM Sans, sans-serif">
        ⚠ Architecture Gaps
      </text>
      {lines.map((l, i) => (
        <text key={i} x={x+10} y={y+32+i*16}
          fill="#805050" fontSize={8.5} fontFamily="DM Mono, monospace">• {l}</text>
      ))}
    </g>
  );
}

// ─── Diagram 1 — CURRENT STATE · Context ─────────────────────────────────────
function CurrentContext() {
  return (
    <svg viewBox="0 0 1060 500" style={{ width:'100%', height:'auto', display:'block' }}>
      <Defs />
      <rect width={1060} height={500} fill={C.bg} />

      {/* heading */}
      <text x={530} y={26} textAnchor="middle"
        fill={C.green} fontSize={14} fontWeight={700} fontFamily="DM Sans, sans-serif">
        Current State — System Context (C4 L1)
      </text>
      <text x={530} y={42} textAnchor="middle"
        fill={C.muted} fontSize={9} fontFamily="DM Mono, monospace">
        Python/Flask · one ephemeral container per assessment · no CI/CD · no observability · cloud-only inference
      </text>

      {/* Actors */}
      <Person x={18}  y={80}  name="Patient"       role={"Smartphone user\nrecords 30s assessment"} />
      <Person x={18}  y={295} name="GP / Clinician" role={"Reviews patient\nassessment history"} />

      {/* In-scope platform */}
      <System x={210} y={55} w={540} h={400}
        title="Lifelight Platform"
        sub="Smartphone rPPG vital signs monitor  ·  CE Class IIa (EU MDR)"
        note="iOS/Android App  +  Azure Cloud Backend (Python/Flask)" />

      {/* Internal note block */}
      <rect x={230} y={100} w={500} h={330} rx={6}
        fill="#060d1a" stroke={C.border} strokeWidth={1} opacity={0.6} />
      {[
        'Assessment flow:',
        '  1. Patient records 30s facial video on smartphone',
        '  2. RGB colour trace sent over HTTPS to Azure',
        '  3. Flask container spins up per assessment',
        '  4. rPPG extraction (POS + CHROM) → HR + Pulse Rate',
        '  5. Result returned to app · container torn down',
        '',
        'Platform characteristics:',
        '  · Python 3 / Flask  —  monolithic per-assessment worker',
        '  · New container spun per assessment (no warm pooling)',
        '  · Azure Container Registry  +  Azure SQL  +  Blob Storage',
        '  · No model versioning, no experiment tracking',
        '  · No distributed tracing or structured observability',
        '  · CE Class IIa covers HR/PR only  —  BP is not cleared',
      ].map((l, i) => (
        <text key={i} x={245} y={120 + i*21}
          fill={i === 0 || i === 8 ? C.mutedLight : C.muted}
          fontSize={9} fontFamily="DM Mono, monospace"
          fontWeight={i === 0 || i === 8 ? 500 : 400}>{l}</text>
      ))}

      {/* External systems */}
      <System x={828} y={110} w={210} h={90}
        title="NHS Practice Systems" external
        sub="GP EHR platforms" note="No current integration" />
      <System x={828} y={270} w={210} h={90}
        title="Azure Cloud" external
        sub="Hosting, SQL, Blob" note="No regulatory posture" />

      {/* Arrows */}
      <Arrow x1={146} y1={148} x2={210} y2={185} color="g" label="records facial video" dy={-10} />
      <Arrow x1={210} y1={205} x2={146} y2={168} color="m" label="HR + Pulse Rate result" dy={10} />
      <Arrow x1={146} y1={362} x2={210} y2={330} color="b" label="reviews assessments" dy={-10} />
      <Arrow x1={750} y1={220} x2={828} y2={175} color="m" label="no integration (future FHIR)" dy={-10} />
      <Arrow x1={750} y1={290} x2={828} y2={315} color="o" label="hosted on" />

      {/* legend */}
      {[[C.greenDim, C.green,'In-scope system'],[C.bg,C.muted,'External system'],['#0d1e35',C.blue,'Person']].map(([bg,bd,lbl],i)=>(
        <g key={lbl}>
          <rect x={230+i*140} y={472} width={12} height={10} fill={bg} stroke={bd} strokeWidth={1.5} rx={2}/>
          <text x={248+i*140} y={480} fill={C.mutedLight} fontSize={8.5} fontFamily="DM Mono, monospace">{lbl}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Diagram 2 — CURRENT STATE · Container ────────────────────────────────────
function CurrentContainer() {
  return (
    <svg viewBox="0 0 1060 580" style={{ width:'100%', height:'auto', display:'block' }}>
      <Defs />
      <rect width={1060} height={580} fill={C.bg} />

      <text x={530} y={26} textAnchor="middle"
        fill={C.green} fontSize={14} fontWeight={700} fontFamily="DM Sans, sans-serif">
        Current State — Container Diagram (C4 L2)
      </text>
      <text x={530} y={42} textAnchor="middle"
        fill={C.muted} fontSize={9} fontFamily="DM Mono, monospace">
        Zooms into the Lifelight Platform runtime boundaries
      </text>

      {/* Patient actor */}
      <Person x={10} y={370} w={120} h={148} name="Patient" role={"Smartphone user"} />

      {/* ── Smartphone zone ── */}
      <Zone x={8} y={58} w={235} h={290} label="Patient's Smartphone" color={C.blue} />
      <Box x={22} y={78} w={205} h={120}
        title="Lifelight App" badge="[Mobile App · iOS / Android]"
        lines={['30s facial video capture','Assessment UI, consent flow','Basic results display']}
        bg={C.blueDim} border={C.blue} />

      {/* ── Azure Cloud zone ── */}
      <Zone x={260} y={58} w={610} h={490} label="Azure Cloud" color={C.orange} />

      {/* Flask worker */}
      <Box x={285} y={80} w={260} h={155}
        title="Assessment Worker" badge="[Python / Flask · Ephemeral Container]"
        lines={[
          'Spun fresh per assessment',
          'rPPG: face detect → ROI → POS/CHROM',
          'HR + Pulse Rate estimation',
          'No signal quality gating',
          'No model versioning',
        ]}
        bg={C.orangeDim} border={C.orange} />

      {/* ACR */}
      <Box x={285} y={305} w={260} h={115}
        title="Azure Container Registry" badge="[Container Registry]"
        lines={[
          'Stores Flask worker images',
          'Manual push only — no CI/CD',
          'No image scanning / SCA',
        ]}
        bg={'#120820'} border={C.purple} />

      {/* SQL */}
      <Box x={600} y={80} w={245} h={130}
        title="Azure SQL Database" badge="[Relational Database]"
        lines={[
          'Assessment results',
          'Patient records',
          'Basic audit log (unstructured)',
        ]}
        bg={C.greenDim} border={C.green} />

      {/* Blob */}
      <Box x={600} y={270} w={245} h={115}
        title="Azure Blob Storage" badge="[Object Storage]"
        lines={[
          'Raw RGB signal traces',
          'Video frame buffers',
          'No retention policy',
        ]}
        bg={C.greenDim} border={C.green} />

      {/* Gap callout */}
      <Gap x={600} y={440} w={245} lines={[
        'No CI/CD pipeline',
        'No model versioning',
        'No observability / tracing',
        'No experiment tracking',
        'No drift detection',
        'No IEC 62304 traceability',
        'No SQI gating',
        'No regulatory audit trail',
      ]} />

      {/* Arrows */}
      {/* Patient → App */}
      <Arrow x1={70}  y1={370} x2={125} y2={198} color="b" label="uses" />
      {/* App → Worker */}
      <Arrow x1={227} y1={132} x2={285} y2={155} color="o" label="HTTPS · RGB trace data" dy={-10} />
      {/* Worker → App */}
      <Arrow x1={285} y1={170} x2={227} y2={148} color="m" label="JSON · HR + PR" dy={10} />
      {/* Worker → SQL */}
      <Arrow x1={545} y1={143} x2={600} y2={143} color="g" label="write results" />
      {/* Worker → Blob */}
      <Arrow x1={430} y1={235} x2={680} y2={270} color="g" label="write signal data" dy={-12} />
      {/* ACR → Worker (image pull on start) */}
      <Arrow x1={415} y1={305} x2={415} y2={235} color="p" label="pulls image on start" dx={30} />

      {/* legend */}
      {[
        [C.blueDim, C.blue, 'Mobile App'],
        [C.orangeDim, C.orange, 'Cloud Container'],
        [C.greenDim, C.green, 'Data Store'],
        ['#120820', C.purple, 'Registry'],
        [C.redDim, C.red, 'Architecture Gap'],
      ].map(([bg,bd,lbl],i)=>(
        <g key={lbl}>
          <rect x={10+i*180} y={556} width={12} height={10} fill={bg} stroke={bd} strokeWidth={1.5} rx={2}/>
          <text x={27+i*180} y={564} fill={C.mutedLight} fontSize={8.5} fontFamily="DM Mono, monospace">{lbl}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Diagram 3 — TARGET STATE · Context ──────────────────────────────────────
function TargetContext() {
  return (
    <svg viewBox="0 0 1060 560" style={{ width:'100%', height:'auto', display:'block' }}>
      <Defs />
      <rect width={1060} height={560} fill={C.bg} />

      <text x={530} y={26} textAnchor="middle"
        fill={C.green} fontSize={14} fontWeight={700} fontFamily="DM Sans, sans-serif">
        Target State — System Context (C4 L1)
      </text>
      <text x={530} y={42} textAnchor="middle"
        fill={C.muted} fontSize={9} fontFamily="DM Mono, monospace">
        AI-native regulated platform · IEC 62304 · ISO 13485 · ISO 14971 · EU MDR · FDA 510(k) · GDPR · NHS DSPT
      </text>

      {/* Actors */}
      <Person x={12} y={58}  name="Patient"       role={"Records assessment\nvia smartphone"} />
      <Person x={12} y={232} name="GP / Clinician" role={"Reviews results\nvia EHR integration"} />
      <Person x={12} y={406} name="ML Engineer"   role={"Deploys models\nmonitors drift"} />

      {/* In-scope platform */}
      <System x={200} y={45} w={540} h={490}
        title="Lifelight AI-Native Platform"
        sub="Regulated ML · on-device + cloud · IEC 62304 / ISO 13485 / ISO 14971" />

      {/* Internal capabilities */}
      <rect x={220} y={95} w={500} h={420} rx={6}
        fill="#060d1a" stroke={C.border} strokeWidth={1} opacity={0.5} />
      {[
        ['📱  On-device signal extraction', C.blue],
        ['    Face detect · ROI (forehead+cheeks) · POS+CHROM+OMIT · SQI', C.muted],
        ['    Metal (iOS) / Vulkan (Android) · MediaPipe landmarking', C.muted],
        ['', null],
        ['🔀  Go Orchestrator  (API gateway + routing)', C.green],
        ['    Native goroutine concurrency · IEC 62304 audit hooks', C.muted],
        ['    Validates SQI before admitting to inference queue', C.muted],
        ['', null],
        ['🐍  Python ML Workers  (stateless, pooled)', C.purple],
        ['    BP: morphological PWA + Bayesian uncertainty bounds', C.muted],
        ['    HR: spectral + peak detection with confidence scoring', C.muted],
        ['    DiffPhys signal enhancement (planned)', C.muted],
        ['', null],
        ['📨  Azure Service Bus  (event-driven workflow)', C.orange],
        ['    Redis Streams locally · dead-letter + replay', C.muted],
        ['', null],
        ['🧪  MLflow  ·  model registry + experiment tracking', C.purple],
        ['🤖  5 AI Agents  (code · compliance · docs · ops · ML validation)', C.red],
        ['📋  IEC 62304 traceability  ·  ISO 14971 risk register', C.green],
        ['🔍  OpenTelemetry observability  ·  drift detection', C.yellow],
      ].map(([line, color], i) => (
        line ? (
          <text key={i} x={238} y={114 + i*20}
            fill={color || C.muted} fontSize={9.5}
            fontFamily="DM Mono, monospace">{line}</text>
        ) : <g key={i} />
      ))}

      {/* External systems */}
      <System x={815} y={52}  w={228} h={82} title="NHS Practice Systems" external
        sub="FHIR HL7 · GP EHR integration" />
      <System x={815} y={150} w={228} h={82} title="Qualio eQMS"          external
        sub="Audit trail · document control" />
      <System x={815} y={248} w={228} h={82} title="GitHub + Actions"     external
        sub="Source control · CI/CD pipeline" />
      <System x={815} y={346} w={228} h={82} title="TestRail"             external
        sub="Regulated test management" />
      <System x={815} y={444} w={228} h={82} title="Azure Cloud"          external
        sub="AKS · Service Bus · SQL · Blob" />

      {/* Arrows */}
      <Arrow x1={140} y1={122} x2={200} y2={168} color="g" label="records 30s facial video" dy={-10} />
      <Arrow x1={200} y1={188} x2={140} y2={142} color="m" label="HR + BP + confidence interval" dy={10} />
      <Arrow x1={140} y1={298} x2={200} y2={278} color="b" label="reviews assessments (EHR)" dy={-10} />
      <Arrow x1={140} y1={468} x2={200} y2={420} color="p" label="deploys models · monitors" dy={-10} />

      <Arrow x1={740} y1={195} x2={815} y2={100} color="g" label="FHIR HL7 results" />
      <Arrow x1={740} y1={260} x2={815} y2={200} color="o" label="audit + change records" />
      <Arrow x1={740} y1={340} x2={815} y2={298} color="b" label="CI/CD triggers" />
      <Arrow x1={740} y1={400} x2={815} y2={394} color="m" label="test evidence" />
      <Arrow x1={740} y1={470} x2={815} y2={492} color="o" label="hosted on" />
    </svg>
  );
}

// ─── Diagram 4 — TARGET STATE · Container ────────────────────────────────────
function TargetContainer() {
  return (
    <svg viewBox="0 0 1160 730" style={{ width:'100%', height:'auto', display:'block' }}>
      <Defs />
      <rect width={1160} height={730} fill={C.bg} />

      <text x={580} y={26} textAnchor="middle"
        fill={C.green} fontSize={14} fontWeight={700} fontFamily="DM Sans, sans-serif">
        Target State — Container Diagram (C4 L2)
      </text>
      <text x={580} y={42} textAnchor="middle"
        fill={C.muted} fontSize={9} fontFamily="DM Mono, monospace">
        Go Orchestrator · Python Workers · Azure Service Bus · MLflow · AKS · AI Agents · IEC 62304 traceability
      </text>

      {/* Patient actor */}
      <Person x={8} y={265} w={116} h={148} name="Patient" role={"Smartphone user"} />

      {/* ─── MOBILE ZONE ─── */}
      <Zone x={132} y={58} w={206} h={620} label="Patient's Smartphone" color={C.blue} />

      <Box x={146} y={78} w={178} h={110}
        title="Lifelight App" badge="[Mobile App · iOS / Android]"
        lines={['Assessment UI + consent','Results display','Upload compressed signal']}
        bg={C.blueDim} border={C.blue} />

      <Box x={146} y={220} w={178} h={155}
        title="On-Device Signal\nProcessor" badge="[Swift / Kotlin · Metal/Vulkan]"
        lines={[
          'Face detection (MediaPipe)',
          'ROI: forehead + cheeks',
          'POS + CHROM + OMIT',
          'SNR-weighted fusion',
          'Signal Quality Index (SQI)',
          'Runs before cloud upload',
        ]}
        bg={'#09193a'} border={C.blue} />

      <Box x={146} y={410} w={178} h={90}
        title="MediaPipe" badge="[On-device · Face Landmarker]"
        lines={['468-point face mesh','iOS Metal · Android Vulkan']}
        bg={'#090f20'} border={'#475569'} />

      {/* ─── AZURE AKS ZONE ─── */}
      <Zone x={350} y={58} w={798} h={620} label="Azure AKS Cluster (production)  /  Docker Compose (local dev)" color={C.orange} />

      {/* ── API tier ── */}
      <Box x={370} y={80} w={240} h={150}
        title="Go Orchestrator" badge="[Go · API Gateway + Router]"
        lines={[
          'REST + gRPC endpoint',
          'Goroutine concurrency',
          'SQI validation gate',
          'Publishes to Service Bus',
          'IEC 62304 audit hooks',
          'JWT auth + rate limiting',
        ]}
        bg={C.greenDim} border={C.green} />

      <Box x={630} y={80} w={215} h={150}
        title="Azure Service Bus" badge="[Message Broker · Event-driven]"
        lines={[
          'Assessment event queue',
          'Dead-letter + replay',
          'Redis Streams (local dev)',
          'Decouples Go ↔ Python',
        ]}
        bg={C.orangeDim} border={C.orange} />

      <Box x={860} y={80} w={275} h={150}
        title="MLflow Model Registry" badge="[ML Platform · Experiment Tracking]"
        lines={[
          'Versioned model artefacts',
          'Staging → Production gates',
          'Experiment run lineage',
          'Kedro pipeline metadata',
          'ISO 14971 risk annotations',
        ]}
        bg={C.purpleDim} border={C.purple} />

      {/* ── Inference tier ── */}
      <Zone x={370} y={268} w={455} h={195} label="ML Inference Workers (auto-scaled pool)" color={C.green} />

      <Box x={382} y={292} w={200} h={155}
        title="BP Inference Worker" badge="[Python · Stateless]"
        lines={[
          'Morphological PWA',
          'Rise time, area ratios,',
          'dicrotic notch, decay τ',
          'Bayesian uncertainty bounds',
          'DiffPhys enhancement (future)',
          'ISO 14971 risk gates',
        ]}
        bg={C.purpleDim} border={C.purple} />

      <Box x={598} y={292} w={200} h={155}
        title="HR Inference Worker" badge="[Python · Stateless]"
        lines={[
          'Spectral peak detection',
          'BPM confidence interval',
          'SQI-gated output',
          'Skin-tone drift flag',
          '(IEC 62303 SaMD class)',
        ]}
        bg={C.purpleDim} border={C.purple} />

      {/* AzureML Pipelines */}
      <Box x={840} y={268} w={295} h={195}
        title="Azure ML Pipelines / Kubeflow" badge="[ML Pipeline Orchestrator · AKS]"
        lines={[
          'Kedro pipeline structure layer',
          'Data catalogue (versioned splits)',
          'Retraining on drift trigger',
          'MMPD + UBFC + proprietary data',
          'SCAMPS synthetic augmentation',
          'Registers to MLflow on pass',
        ]}
        bg={'#0a0a28'} border={'#818cf8'} />

      {/* ── AI Agent tier ── */}
      <Zone x={370} y={495} w={455} h={175} label="AI Agent Layer  (3 trust zones · least-privilege)" color={C.red} />

      {[
        ['Code Review Agent',      'PR review · dependency audit',      370+14,  495+30],
        ['Compliance Check Agent', 'IEC 62304 · MDR · GDPR gates',      370+14,  495+93],
        ['ML Validation Agent',    'Clinical significance of BP model', 600+2,   495+30],
        ['Ops Agent',              'Drift alerts · infra · oncall',     600+2,   495+93],
      ].map(([title, desc, ax, ay]) => (
        <g key={title}>
          <rect x={ax} y={ay} width={208} height={52} rx={4}
            fill={C.redDim} stroke={C.red} strokeWidth={1} opacity={0.85} />
          <text x={ax+104} y={ay+18} textAnchor="middle"
            fill={C.white} fontSize={9} fontWeight={700} fontFamily="DM Sans, sans-serif">{title}</text>
          <text x={ax+104} y={ay+32} textAnchor="middle"
            fill={C.red} fontSize={7.5} fontFamily="DM Mono, monospace">[AI Agent]</text>
          <text x={ax+104} y={ay+44} textAnchor="middle"
            fill={C.mutedLight} fontSize={8} fontFamily="DM Mono, monospace">{desc}</text>
        </g>
      ))}
      {/* Docs agent — 5th agent */}
      <g>
        <rect x={370+14} y={495+156} width={422} height={12} rx={3}
          fill={C.redDim} stroke={C.red} strokeWidth={0.8} opacity={0.6} />
        <text x={601} y={495+165} textAnchor="middle"
          fill={C.muted} fontSize={8} fontFamily="DM Mono, monospace">
          + Documentation Agent · auto-generates IEC 62304 artefacts from code changes
        </text>
      </g>

      {/* ── Data tier ── */}
      <Box x={840} y={495} w={295} h={175}
        title="Data + Observability Layer" badge="[Azure · OpenTelemetry]"
        lines={[
          'Azure SQL — results, audit trail,',
          '  IEC 62304 traceability records',
          'Azure Blob — signals (encrypted),',
          '  model artefacts, training data',
          'OpenTelemetry — distributed traces',
          'Model drift + SQI dashboards',
          'Azure Monitor · SLA alerting',
        ]}
        bg={C.yellowDim} border={C.yellow} />

      {/* ─── ARROWS ─── */}
      {/* Patient → App */}
      <Arrow x1={68} y1={265} x2={146} y2={200} color="b" label="uses" />
      {/* App → Signal Processor */}
      <Arrow x1={235} y1={188} x2={235} y2={220} color="b" label="video frames" />
      {/* MediaPipe → Signal Processor */}
      <Arrow x1={235} y1={410} x2={235} y2={375} color="m" label="landmarks" />
      {/* Signal Processor → Go Orchestrator */}
      <Arrow x1={324} y1={297} x2={370} y2={175} color="g"
        label="HTTPS · compressed signal" dx={30} dy={-12} />
      {/* Go Orchestrator → Service Bus */}
      <Arrow x1={610} y1={152} x2={630} y2={152} color="o" label="publish event" />
      {/* Service Bus → Workers */}
      <Arrow x1={688} y1={230} x2={550} y2={292} color="o" label="consume event" dy={-12} />
      <Arrow x1={688} y1={240} x2={750} y2={292} color="o" label="" />
      {/* Workers → MLflow */}
      <Arrow x1={798} y1={360} x2={910} y2={230} color="p" label="load model version" dx={30} dy={-10} />
      {/* Go Orchestrator → SQL */}
      <Arrow x1={488} y1={230} x2={900} y2={495} color="g" label="write audit record" dx={-60} dy={-15} />
      {/* BP Worker → SQL */}
      <Arrow x1={482} y1={447} x2={900} y2={505} color="g" label="write results + uncertainty" dx={-20} dy={10} />
      {/* Workers → Blob */}
      <Arrow x1={700} y1={447} x2={900} y2={530} color="g" label="write signal data" dy={12} />
      {/* AzureML → MLflow */}
      <Arrow x1={988} y1={268} x2={988} y2={230} color="p" label="register model" />
      {/* Agents → Go Orch */}
      <Arrow x1={490} y1={495} x2={490} y2={463} color="r" label="audit hooks · alerts" />
      {/* Observability */}
      <Arrow x1={490} y1={158} x2={900} y2={508} color="y" label="telemetry" dy={-20} dx={60} />

      {/* legend */}
      {[
        [C.blueDim,   C.blue,   'Mobile / On-device'],
        [C.greenDim,  C.green,  'Go Orchestrator'],
        [C.purpleDim, C.purple, 'Python ML / MLflow'],
        [C.orangeDim, C.orange, 'Messaging / Pipelines'],
        [C.redDim,    C.red,    'AI Agents'],
        [C.yellowDim, C.yellow, 'Observability / Data'],
        ['#0a0a28',   '#818cf8','ML Pipeline'],
      ].map(([bg,bd,lbl],i)=>(
        <g key={lbl}>
          <rect x={i<4 ? 12+i*200 : 12+(i-4)*200} y={i<4?704:718}
            width={12} height={10} fill={bg} stroke={bd} strokeWidth={1.5} rx={2}/>
          <text x={i<4 ? 30+i*200 : 30+(i-4)*200} y={i<4?712:726}
            fill={C.mutedLight} fontSize={8.5} fontFamily="DM Mono, monospace">{lbl}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function C4App() {
  const [state, setState] = useState('current');
  const [level, setLevel] = useState('context');

  const diagrams = {
    current: { context: <CurrentContext />, container: <CurrentContainer /> },
    target:  { context: <TargetContext  />, container: <TargetContainer  /> },
  };

  const tabStyle = (active, accentColor = C.green) => ({
    padding: '9px 22px',
    background:   active ? accentColor : 'transparent',
    color:        active ? '#000'       : C.mutedLight,
    border:       `1px solid ${active ? accentColor : C.border}`,
    borderRadius: '6px',
    cursor:       'pointer',
    fontFamily:   'DM Sans, sans-serif',
    fontWeight:   active ? 700 : 400,
    fontSize:     '13px',
    transition:   'all 0.15s ease',
    letterSpacing: '-0.2px',
  });

  const levelStyle = (active) => ({
    padding: '5px 18px',
    background:   'transparent',
    color:        active ? C.orange     : C.muted,
    border:       `1px solid ${active ? C.orange : C.border}`,
    borderRadius: '4px',
    cursor:       'pointer',
    fontFamily:   'DM Mono, monospace',
    fontSize:     '11px',
    transition:   'all 0.15s ease',
  });

  return (
    <div style={{
      background:  C.bg,
      minHeight:   '100vh',
      fontFamily:  'DM Sans, sans-serif',
      color:       C.text,
      padding:     '20px 16px 28px',
    }}>
      <FontStyle />

      {/* ── Header ── */}
      <div style={{ textAlign:'center', marginBottom:'22px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          marginBottom: '6px',
        }}>
          <span style={{
            display: 'inline-block', width: '8px', height: '8px',
            borderRadius: '50%', background: C.green,
            boxShadow: `0 0 8px ${C.green}`,
          }} />
          <span style={{ fontSize:'22px', fontWeight:700, color:C.green, letterSpacing:'-0.5px' }}>
            Medtech Platform — C4 Architecture
          </span>
          <span style={{
            display: 'inline-block', width: '8px', height: '8px',
            borderRadius: '50%', background: C.green,
            boxShadow: `0 0 8px ${C.green}`,
          }} />
        </div>
        <div style={{ fontSize:'11px', color:C.muted, fontFamily:'DM Mono, monospace' }}>
          rPPG contactless vital signs platform · smartphone-based HR + BP · CE Class IIa · FDA 510(k) pursuit
        </div>
      </div>

      {/* ── State tabs ── */}
      <div style={{ display:'flex', gap:'10px', justifyContent:'center', marginBottom:'14px' }}>
        <button style={tabStyle(state === 'current')} onClick={() => setState('current')}>
          Current State
          <div style={{ fontSize:'9px', fontFamily:'DM Mono, monospace', opacity:0.7, marginTop:'2px' }}>
            Python/Flask · per-container · no CI/CD
          </div>
        </button>
        <button style={tabStyle(state === 'target', C.green)} onClick={() => setState('target')}>
          Target State
          <div style={{ fontSize:'9px', fontFamily:'DM Mono, monospace', opacity:0.7, marginTop:'2px' }}>
            Go + Python · event-driven · AI-native
          </div>
        </button>
      </div>

      {/* ── Level tabs ── */}
      <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'18px' }}>
        <button style={levelStyle(level === 'context')}   onClick={() => setLevel('context')}>
          L1 · System Context
        </button>
        <button style={levelStyle(level === 'container')} onClick={() => setLevel('container')}>
          L2 · Container
        </button>
      </div>

      {/* ── Diagram area ── */}
      <div style={{
        background:   C.surface,
        borderRadius: '10px',
        border:       `1px solid ${C.border}`,
        padding:      '6px',
        overflow:     'hidden',
        boxShadow:    `0 0 40px rgba(0,195,137,0.04)`,
      }}>
        {diagrams[state][level]}
      </div>

      {/* ── C4 key ── */}
      <div style={{
        marginTop:'14px', padding:'10px 16px',
        background: C.surface, borderRadius:'8px',
        border:`1px solid ${C.border}`,
        display:'flex', gap:'24px', flexWrap:'wrap', justifyContent:'center',
        fontSize:'9px', color:C.muted, fontFamily:'DM Mono, monospace',
      }}>
        {[
          ['L1 Context',   'System in its external environment — actors + external systems'],
          ['L2 Container', 'Runtime boundaries — deployable units, datastores, message buses'],
          ['Zone (dashed)','Deployment boundary — smartphone, AKS cluster, dev/prod'],
          ['[Person]',     'Human actor interacting with the system'],
          ['Arrow',        'Relationship or data flow with protocol label'],
        ].map(([k,v]) => (
          <span key={k}>
            <strong style={{color:C.mutedLight}}>{k}</strong>: {v}
          </span>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        textAlign:'center', marginTop:'12px',
        fontSize:'9px', color:C.muted, fontFamily:'DM Mono, monospace',
      }}>
        C4 Model (Simon Brown) · halmstraw/medtech-platform-docs · April 2026 ·
        rPPG lit review: Curran 2023, FDA draft guidance Jan 2026, Wang 2016 (POS), MMPD 2023
      </div>
    </div>
  );
}
