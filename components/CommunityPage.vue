<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';
import type { DefaultTheme } from 'vitepress';
import { eisvanaMembers } from '../variables/members';

const members: DefaultTheme.TeamMember[] = structuredClone(eisvanaMembers).map((member) => {
  if (!member.avatar.startsWith('http')) member.avatar = `/images/members/${member.avatar}`;

  if (member.medals) {
    // TODO: uncomment when medals exist
    // const firstThreeMedals = member.medals.slice(0, 3); // NoSonar get first three medals
    // const medalHtml = firstThreeMedals.map(
    //   (medal) =>
    //     `<span class="VPBadge ${medal.type}" title="${medal.text}"><img alt="${medal.text}" src="${medal.icon}" width="32" /><div class="text-center">${medal.amount ?? 1}x</div></span>`
    // );
    // member.desc = `<div class="medals">${medalHtml.join('')}</div>${member.desc}`;
    delete member.medals;
  }

  if (member.pageLink) {
    member.desc += `<br><a href="${member.pageLink}">Read more</a>`;
    delete member.pageLink;
  }

  return member;
});
</script>

<template>
  <VPTeamMembers
    :members="members"
    size="small"
  />
</template>

<style scoped lang="scss">
:deep(.profile) {
  .avatar-img {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .desc {
    a {
      text-decoration-style: solid;

      &:hover {
        color: var(--vp-c-brand-2);
      }
    }

    .medals {
      margin-block-end: 0.25rem;
    }
  }
}
</style>
