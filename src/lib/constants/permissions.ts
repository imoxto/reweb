export const projectRoles = ["owner", "admin", "member", "viewer"] as const;

export type ProjectRole = (typeof projectRoles)[number];

export const projectScopes = ["project:read", "project:write", "project:delete", "resource:read", "resource:write", "resource:delete", "resource:create", "resource:publish", "member:change", "admin:change", "owner:change"] as const;

export type ProjectScope = (typeof projectScopes)[number];

export const projectPermissions: Record<ProjectRole, ProjectScope[] | ReadonlyArray<ProjectScope>> = {
  owner: projectScopes,
  admin: ["project:read", "project:write", "resource:read", "resource:write", "resource:delete", "resource:create", "resource:publish", "member:change", "admin:change"],
  member: ["project:read", "project:write", "resource:read", "resource:write", "resource:delete", "resource:create", "resource:publish"],
  viewer: ["project:read", "resource:read"],
};
