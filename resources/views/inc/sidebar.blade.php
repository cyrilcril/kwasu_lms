<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element"> 
                    <span>
                        <img alt="image" class="img-circle" src="{{ asset('img/profile_small.jpg') }}" />
                    </span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <span class="clear"> 
                            <span class="block m-t-xs"> <strong class="font-bold">{{Auth::user()->name}}</strong></span>
                            @if (Auth::user()->user_access_id == '1')
                                <span class="text-muted text-xs block">{{"Normal Staff"}}<b class="caret"></b></span>
                            @elseif (Auth::user()->user_access_id == '2')
                                <span class="text-muted text-xs block">{{"HOD"}}<b class="caret"></b></span>
                            @elseif (Auth::user()->user_access_id == '3')
                                <span class="text-muted text-xs block">{{"PROVOST"}}<b class="caret"></b></span>
                            @elseif (Auth::user()->user_access_id == '4')
                                <span class="text-muted text-xs block">{{"REGISTRY"}}<b class="caret"></b></span>
                            @elseif (Auth::user()->user_access_id == '5')
                                <span class="text-muted text-xs block">{{"VICE CHANCELLOR"}}<b class="caret"></b></span>
                            @elseif (Auth::user()->user_access_id == '100')
                                <span class="text-muted text-xs block">{{"SUPER ADMIN"}}<b class="caret"></b></span>
                            @endif
                        </span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a href="{{ url('/profile') }}">Profile</a></li>
                        <li class="divider"></li>
                        <li>
                            <a href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                                document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </li>
                    </ul>
                </div>
                <div class="logo-element">
                    KWASU - LMS
                </div>
            </li>
            <li class="active">
                <a href="{{ url('/')}}"><i class="fa fa-th-large"></i><span class="nav-label"> Dashboards </span></a>
            </li>
            @if (in_array(Auth::user()->user_access_id, array('1','2','3','4','5','100')))
                <li>
                    <a href="{{ url('/application') }}"><i class="fa fa-pencil-square-o"></i><span class="nav-label">Apply</span></a>
                </li>
            @endif
            @if (in_array(Auth::user()->user_access_id, array('2','3','4','5','100')))
                <li>
                    <a href="{{ url('/applied') }}"><i class="fa fa-file-word-o"></i><span class="nav-label">Applied</span></a>
                </li>
            @endif
            @if (in_array(Auth::user()->user_access_id, array('4','5','100')))
                <li>
                    <a href="{{ url('/search') }}"><i class="fa fa-search"></i><span class="nav-label">Search</span></a>
                </li>
                <li>
                    <a href="{{ url('/allLeave') }}"><i class="fa fa-folder-open"></i><span class="nav-label">All Leave</span></a>
                </li>
                <li>
                    <a href="{{ url('/approved') }}"><i class="fa fa-check-square-o"></i><span class="nav-label">Approved Leaves</span></a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-institution" ></i><span class="nav-label">Employee Class</span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse">
                        <li><a href="{{ url('/faculty') }}"></i><span class="nav-label">Add Faculty</span></a></li>
                        <li><a href="{{ url('/department') }}"></i><span class="nav-label">Add Department</span></a></li>
                        <li><a href="{{ url('/unit') }}"></i><span class="nav-label">Add Unit</span></a></li>
                    </ul>
                </li>
                <li>
                    <a href="{{ url('/leaveType') }}"><i class="fa fa-sliders"></i><span class="nav-label">Leave Type</span></a>
                </li>
                <li>
                    <a href="{{ url('/holiday') }}"><i class="fa fa-calendar"></i><span class="nav-label">Add Holiday</span></a>
                </li>
                <li>
                    <a href="{{ url('/log') }}"><i class="fa fa-calendar"></i><span class="nav-label">Activity Log</span></a>
                </li>
            @endif
            {{-- <li>
                <a href="{{ url('/signUp') }}"><i class="fa fa-user-plus"></i><span class="nav-label">signUp - SignUp</span></a>
            </li> --}}
        </ul>
    </div>
</nav>
