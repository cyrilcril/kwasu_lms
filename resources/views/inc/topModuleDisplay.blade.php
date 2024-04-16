<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-10">
        <h2>@yield('title')</h2>
        <ol class="breadcrumb">
            <li>
                <a href="{{ url('/') }}">Home</a>
            </li>
            <li>
                <a>@yield('module')</a>
            </li>
            <li class="active">
                <strong>@yield('task') </strong>
            </li>
        </ol>
    </div>
    <div class="col-lg-2">

    </div>
</div>