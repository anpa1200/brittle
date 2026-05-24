# Security Policy

## Responsible Disclosure

BrittleBench may eventually use third-party tooling such as pySigma, YARA,
Sigma conversion backends, detection-rule parsers, and evaluation harnesses.
If you discover a vulnerability in BrittleBench tooling or in the way this
project uses those dependencies, please report it privately before public
disclosure.

Contact:

- GitHub: [@anpa1200](https://github.com/anpa1200)
- Email: 1200km@gmail.com

## Disclosure Timeline

This project follows a 90-day coordinated disclosure standard by default:

1. Report received and acknowledged.
2. Impact and affected component identified.
3. Upstream maintainers notified when the issue belongs to third-party tooling.
4. Fix, mitigation, or advisory coordinated before public disclosure.
5. Public disclosure after resolution or after 90 days, unless active exploitation or other material risk requires a different timeline.

## Scope

In scope:

- Vulnerabilities in future BrittleBench code.
- Unsafe handling of future datasets or restricted mutation artifacts.
- Vulnerabilities discovered in study dependencies while performing this research.
- Issues that could expose secrets, restricted raw data, or private reports.

Out of scope:

- Requests to publish raw weaponizable artifacts.
- Methodological disagreements that do not create a security vulnerability.
- Vulnerabilities in unrelated software not used by this project.

## Current Phase

The project is currently in the research protocol phase. No execution-phase code
or data exists yet, so most vulnerability reports will likely concern project
documentation or future dependency planning.
