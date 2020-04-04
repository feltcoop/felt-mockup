# Felt project

## Docs

- [setup](setup) - get started developing Felt
- [deploy](deploy) - run Felt in production

## Description

The `src/project` directory contains code, docs, and data
related to the Felt project in the meta sense.
It contains the things needed for developing, building, and deploying Felt.

Often these concerns are scattered around a repo
and many pieces are typically located off the project's root directory.
In Felt, we want source code and configuration to be universally available
so they can be used anywhere that's appropriate,
maximizing code reuse and flexibility
while benefitting from standardized tooling.
To achieve this, we draw no unnecessary distinctions between
project-level and source-level concerns.

In the future, this design will help us leverage powerful and interesting things
like codegen and introspective development tools.
