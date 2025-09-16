from modeltranslation.translator import translator, TranslationOptions
from .models import Project, TeamMember


class ProjectTranslationOptions(TranslationOptions):
    fields = ("title", "client")


class TeamMemberTranslationOptions(TranslationOptions):
    fields = ("name", "role")


translator.register(Project, ProjectTranslationOptions)
translator.register(TeamMember, TeamMemberTranslationOptions)