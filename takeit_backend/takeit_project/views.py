from django.shortcuts import render


def index(request):
    #num_visits = request.session.get('num_visits', 0)
    #request.session['num_visits'] = num_visits + 1
    #context = {'num_books': 6, 'num_instances': 7, 
    #           'num_instances_available': 8, 'num_authors': 6, 'num_visits': num_visits}
    #return render(request, 'index.html', context=context)
    return render(request, 'index.html')
