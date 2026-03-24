# SKILLS.md — Layer Documentation Conventions

Read this before working on any file in `docs/layers/`.

---

## What each layer file covers

Every layer file follows the same structure:

1. **Purpose** — what this layer does and why it exists
2. **Target state** — the recommended tooling and configuration
3. **Tool choices** — the specific tools selected, with rationale and alternatives considered
4. **AI agent involvement** — which agent(s) interact with this layer, and how
5. **Human responsibilities** — what must remain human-owned
6. **Regulatory hooks** — specific clauses this layer addresses, with evidence it produces
7. **Connections** — what feeds into this layer and what this layer produces for the next

## Regulatory hooks section format

Always cite specific clauses. State what evidence the tooling produces, not just that it "supports compliance."

Example:
> **IEC 62304 §8.1.3** — Reproducible builds. GitHub Actions workflow runs are retained as immutable records. Every release build is tagged with a commit SHA and the workflow run ID. This constitutes the build record required by §8.1.3.

## The ML pipeline layer (06) is unique

Layer 06 covers the product's core clinical functionality — the rPPG signal processing and BP prediction model. This layer has additional regulatory weight:
- Model changes are design changes under IEC 62304 and require a change request
- Model versions must be traceable to assessment outputs (which model produced which result)
- The ML Validation Agent has a specific role here — see `docs/agents/agent-ml-validation.md`
- Cost optimisation (current 7p per assessment) is a business goal documented in this layer

## Azure-specific notes

The infrastructure is Azure, not AWS. When referencing cloud services use Azure equivalents:
- ECR → Azure Container Registry (ACR)
- Secrets Manager → Azure Key Vault
- CloudTrail → Azure Monitor / Activity Log
- EKS → AKS (Azure Kubernetes Service)
- S3 → Azure Blob Storage

## Layer numbering

Layers are numbered 01–15 following AMENDMENTS-001. Do not renumber further without
creating a new amendments document. GitHub Issues and cross-references use these numbers.

Current order:
01 Requirements and risk · 02 Design and UX · 03 QMS and documentation
04 Source control · 05 Delivery process · 06 CI/CD pipeline · 07 ML pipeline
08 Testing and verification · 09 Infrastructure · 10 Observability
11 Mobile architecture · 12 Security architecture · 13 AI engineering strategy
14 Developer experience · 15 Maintenance and automation
