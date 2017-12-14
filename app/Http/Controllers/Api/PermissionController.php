<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Requests\PermissionStore;
use Illuminate\Support\Facades\Schema;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $row = 10;
        if ($request->row) {
            $row = $request->row;
        }
        
        if ($request->search) {
            $search = $request->search;
            $permission = Permission::where(function ($q) use ($search) {
                $columns = Schema::getColumnListing('permissions');
                foreach ($columns as $key => $column) {
                    if ($key==0) {
                        $q->where($column, 'like', "%$search%");
                    } else {
                        $q->orWhere($column, 'like', "%$search%");
                    }
                }
            })->paginate($row);
        } else {
            $permission = Permission::paginate($row);
        }

        return $permission;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionStore $request)
    {

        $permission = Permission::create([
            'name' => $request->name,
        ]);

        return response()->json($permission, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $permission = Permission::findOrFail($id);

        return $permission;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|unique:permissions,name,'.$id
        ]);
        
        $permission = Permission::findOrFail($id);
        $permission->update([
            'name' => $request->name
        ]);

        return response()->json($permission, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Permission::destroy($id);

        return response()->json(null, 204);
    }
}
