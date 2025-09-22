from django.shortcuts import render
from .models import Profile, Project, Skill, Education, Language

def home(request):
    profile = Profile.objects.first()  # Assuming one profile
    projects = Project.objects.all()
    skills = Skill.objects.all()
    educations = Education.objects.all()
    languages = Language.objects.all()
    context = {
        'profile': profile,
        'projects': projects,
        'skills': skills,
        'educations': educations,
        'languages': languages,
    }
    return render(request, 'portfolio/home.html', context)
